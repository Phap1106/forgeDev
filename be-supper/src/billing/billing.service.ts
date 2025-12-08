// src/billing/billing.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWallet } from './entities/user-wallet.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { PaymentMethod } from '../payments/entities/payment-method.entity';

import { Payment } from '../payments/entities/payment.entity';
import { CreateQrDepositDto } from './dto/create-qr-deposit.dto';
import { VerifyCryptoDepositDto } from './dto/verify-crypto-deposit.dto';
import { BlockchainService } from './blockchain.service';

type BankQrDetails = {
  bankId: string;
  accountNo: string;
  accountName: string;
  template?: string;
};

type CryptoWalletDetails = {
  explorer: 'etherscan_v2';
  chainId: number;
  address: string;
};

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly walletRepo: Repository<UserWallet>,
    @InjectRepository(WalletTransaction)
    private readonly walletTxRepo: Repository<WalletTransaction>,
    @InjectRepository(PaymentMethod)
    private readonly paymentMethodRepo: Repository<PaymentMethod>,
    @InjectRepository(Payment)
    private readonly paymentRepo: Repository<Payment>,
    private readonly blockchainService: BlockchainService,
  ) {}

  // ================== VÍ NỘI BỘ ==================

  private async getOrCreateWallet(userId: number): Promise<UserWallet> {
    let wallet = await this.walletRepo.findOne({ where: { userId } });

    if (!wallet) {
      wallet = this.walletRepo.create({
        userId,
        balanceDollar: 0,
        totalDepositDollar: 0,
        totalBonusDollar: 0,
        totalSpentDollar: 0,
      });
      wallet = await this.walletRepo.save(wallet);
    }

    return wallet;
  }

  /**
   * Cập nhật số dư ví + ghi lại lịch sử giao dịch
   * dùng chung cho: deposit, bonus, purchase, refund, adjustment
   */
  private async createWalletTxAndUpdateBalance(
    userId: number,
    type: WalletTransaction['type'], // 'deposit' | 'purchase' | 'refund' | 'bonus' | 'adjustment'
    amountDollar: number,
    paymentId?: number,
    orderId?: number,
    meta?: any,
  ): Promise<UserWallet> {
    const wallet = await this.getOrCreateWallet(userId);

    // 1. Cập nhật số dư & các tổng
    if (type === 'deposit') {
      wallet.balanceDollar += amountDollar;
      wallet.totalDepositDollar += amountDollar;
    } else if (type === 'bonus') {
      wallet.balanceDollar += amountDollar;
      wallet.totalBonusDollar += amountDollar;
    } else if (type === 'purchase') {
      wallet.balanceDollar -= amountDollar;
      wallet.totalSpentDollar += amountDollar;
    } else if (type === 'refund') {
      wallet.balanceDollar += amountDollar;
      // Có thể thêm logic trừ lại totalSpent nếu bạn muốn
    } else if (type === 'adjustment') {
      wallet.balanceDollar += amountDollar;
    }

    const savedWallet = await this.walletRepo.save(wallet);

    // 2. Ghi transaction
    const tx = this.walletTxRepo.create({
      userId,
      type,
      amountDollar,
      balanceAfter: savedWallet.balanceDollar,
      orderId: orderId ?? null,
      paymentId: paymentId ?? null,
      meta: meta
        ? typeof meta === 'string'
          ? meta
          : JSON.stringify(meta)
        : undefined, // meta?: string nên dùng undefined thay vì null
    });

    await this.walletTxRepo.save(tx);

    return savedWallet;
  }

  // ================== QR BANK (VIETQR / BANK TRANSFER) ==================

  /**
   * Tạo yêu cầu nạp ví qua QR ngân hàng.
   * - Tạo 1 payment status = 'pending'
   * - Build link ảnh QR (ưu tiên dùng details JSON nếu có)
   * - FE hiển thị ảnh QR cho user quét
   */
  async createQrDeposit(
    userId: number,
    dto: CreateQrDepositDto,
  ): Promise<{
    paymentId: number;
    amountDollar: number;
    qrImageUrl: string | null;
    description: string;
  }> {
    if (dto.amountDollar <= 0) {
      throw new BadRequestException('amountDollar phải > 0');
    }

    const pm = await this.paymentMethodRepo.findOne({
      where: { id: dto.paymentMethodId, isActive: true },
    });

    if (!pm) {
      throw new NotFoundException('Payment method không tồn tại');
    }

    if (pm.type !== 'qr' && pm.type !== 'bank') {
      throw new BadRequestException(
        'Payment method phải là type = qr hoặc bank',
      );
    }

    const description =
      dto.description ??
      `TOPUP-${userId}-${Date.now().toString().slice(-6)}`.toUpperCase();

    // Tạo payment pending
    let payment = this.paymentRepo.create({
      userId,
      orderId: null,
      paymentMethodId: pm.id,
      provider: 'vietqr',
      amountDollar: dto.amountDollar,
      currency: 'USD',
      status: 'pending',
      providerTxnId: null,
      rawResponse: null,
      paidAt: null,
    });

    payment = await this.paymentRepo.save(payment);

    // Build link ảnh QR (Quick Link VietQR) nếu admin cấu hình details
    let qrImageUrl = pm.qrImageUrl ?? null;

    if (pm.details) {
      try {
        const parsed = JSON.parse(pm.details) as BankQrDetails;
        if (parsed.bankId && parsed.accountNo && parsed.accountName) {
          const template = parsed.template || 'compact';
          const amountVnd = dto.amountDollar * 25000; // ví dụ quy đổi tạm
          const base = 'https://img.vietqr.io/image';
          const qs = new URLSearchParams({
            amount: String(amountVnd),
            addInfo: description,
            accountName: parsed.accountName,
          });
          qrImageUrl = `${base}/${parsed.bankId}-${parsed.accountNo}-${template}.png?${qs.toString()}`;
        }
      } catch {
        // JSON lỗi thì bỏ qua, dùng qr_image_url tĩnh nếu có
      }
    }

    return {
      paymentId: payment.id,
      amountDollar: dto.amountDollar,
      qrImageUrl,
      description,
    };
  }

  /**
   * Dùng cho TEST hoặc gắn với webhook provider:
   * - Nếu payment.status != success thì set success và cộng tiền vào ví
   */
  async confirmQrDepositByPaymentId(
    paymentId: number,
  ): Promise<{ wallet: UserWallet; payment: Payment }> {
    const payment = await this.paymentRepo.findOne({
      where: { id: paymentId },
    });

    if (!payment) {
      throw new NotFoundException('Payment không tồn tại');
    }

    if (!payment.userId) {
      throw new BadRequestException('Payment không có userId');
    }

    if (payment.status === 'success') {
      const wallet = await this.getOrCreateWallet(payment.userId);
      return { wallet, payment };
    }

    payment.status = 'success';
    payment.paidAt = new Date();
    await this.paymentRepo.save(payment);

    const wallet = await this.createWalletTxAndUpdateBalance(
      payment.userId,
      'deposit',
      payment.amountDollar,
      payment.id,
      payment.orderId ?? undefined,
      { source: 'qr', provider: payment.provider },
    );

    return { wallet, payment };
  }

  // ================== CRYPTO (BINANCE / BYBIT GỬI ON-CHAIN) ==================

  /**
   * Xử lý nạp ví qua crypto:
   * - User gửi tiền từ Binance/Bybit tới địa chỉ ví on-chain (details.address)
   * - FE lấy txHash user nhập vào, call API này
   * - Service gọi Etherscan V2 check tx, nếu confirmed thì cộng tiền
   * Lưu ý: ví dụ này chỉ check status tx, CHƯA check số lượng token/native exact.
   */
  async verifyCryptoDeposit(
    userId: number,
    dto: VerifyCryptoDepositDto,
  ): Promise<{
    wallet: UserWallet;
    payment: Payment;
    explorerRaw: any;
  }> {
    const pm = await this.paymentMethodRepo.findOne({
      where: { id: dto.paymentMethodId, isActive: true },
    });

    if (!pm) {
      throw new NotFoundException('Payment method không tồn tại');
    }

    if (pm.type !== 'wallet') {
      throw new BadRequestException('Payment method phải có type = wallet');
    }

    if (dto.amountDollar <= 0) {
      throw new BadRequestException('amountDollar phải > 0');
    }

    if (!pm.details) {
      throw new BadRequestException(
        'Payment method thiếu details (chainId, address, explorer)',
      );
    }

    let details: CryptoWalletDetails;
    try {
      details = JSON.parse(pm.details) as CryptoWalletDetails;
    } catch {
      throw new BadRequestException('details không phải JSON hợp lệ');
    }

    if (details.explorer !== 'etherscan_v2') {
      throw new BadRequestException(
        'Hiện tại chỉ hỗ trợ explorer = etherscan_v2',
      );
    }

    if (!details.chainId) {
      throw new BadRequestException('details.chainId không hợp lệ');
    }

    // 1. Check tx trên explorer
    const explorerResult = await this.blockchainService.checkTxOnEtherscanV2(
      dto.txHash,
      details.chainId,
    );

    if (!explorerResult.confirmed) {
      throw new BadRequestException('Giao dịch chưa xác nhận hoặc thất bại');
    }

    // 2. Idempotent: kiểm tra xem txHash đã xử lý chưa
    let payment = await this.paymentRepo.findOne({
      where: { providerTxnId: dto.txHash },
    });

    if (payment && payment.status === 'success') {
      const wallet = await this.getOrCreateWallet(userId);
      return { wallet, payment, explorerRaw: explorerResult.raw };
    }

    if (!payment) {
      payment = this.paymentRepo.create({
        userId,
        orderId: null,
        paymentMethodId: pm.id,
        provider: 'etherscan_v2',
        amountDollar: dto.amountDollar,
        currency: 'USD',
        status: 'success',
        providerTxnId: dto.txHash,
        rawResponse: JSON.stringify(explorerResult.raw),
        paidAt: new Date(),
      });
    } else {
      // có rồi nhưng còn pending
      payment.status = 'success';
      payment.paidAt = new Date();
      payment.rawResponse = JSON.stringify(explorerResult.raw);
    }

    payment = await this.paymentRepo.save(payment);

    const wallet = await this.createWalletTxAndUpdateBalance(
      userId,
      'deposit',
      dto.amountDollar,
      payment.id,
      payment.orderId ?? undefined,
      {
        source: 'crypto',
        explorer: 'etherscan_v2',
        chainId: details.chainId,
        txHash: dto.txHash,
      },
    );

    return { wallet, payment, explorerRaw: explorerResult.raw };
  }
}
