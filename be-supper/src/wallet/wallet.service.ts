import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserWallet } from './entities/user-wallet.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { User } from '../users/user.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly walletRepo: Repository<UserWallet>,
    @InjectRepository(WalletTransaction)
    private readonly txRepo: Repository<WalletTransaction>,
  ) {}

  async getOrCreateWallet(user: User | number) {
    const userId = typeof user === 'number' ? user : user.id;
    let wallet = await this.walletRepo.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!wallet) {
      wallet = this.walletRepo.create({
        user: { id: userId } as any,
      });
      wallet = await this.walletRepo.save(wallet);
    }
    return wallet;
  }

  async getBalance(userId: number) {
    const wallet = await this.getOrCreateWallet(userId);
    return {
      balance: wallet.balanceDollar,
      totalDeposit: wallet.totalDepositDollar,
      totalBonus: wallet.totalBonusDollar,
      totalSpent: wallet.totalSpentDollar,
    };
  }

  async deposit(userId: number, amount: number, meta?: any) {
    if (amount <= 0) throw new Error('Amount must > 0');
    const wallet = await this.getOrCreateWallet(userId);
    wallet.balanceDollar += amount;
    wallet.totalDepositDollar += amount;

    await this.walletRepo.save(wallet);

    const tx = this.txRepo.create({
      user: { id: userId } as any,
      type: 'deposit',
      amountDollar: amount,
      balanceAfter: wallet.balanceDollar,
      meta: meta ? JSON.stringify(meta) : null,
    });
    await this.txRepo.save(tx);

    return wallet;
  }

  async spend(userId: number, amount: number, meta?: any) {
    const wallet = await this.getOrCreateWallet(userId);
    if (wallet.balanceDollar < amount) {
      throw new NotFoundException('Số dư không đủ');
    }
    wallet.balanceDollar -= amount;
    wallet.totalSpentDollar += amount;
    await this.walletRepo.save(wallet);

    const tx = this.txRepo.create({
      user: { id: userId } as any,
      type: 'purchase',
      amountDollar: -amount,
      balanceAfter: wallet.balanceDollar,
      meta: meta ? JSON.stringify(meta) : null,
    });
    await this.txRepo.save(tx);

    return wallet;
  }

  listTransactions(userId: number) {
    return this.txRepo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }
}
