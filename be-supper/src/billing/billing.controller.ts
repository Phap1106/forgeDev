// src/billing/billing.controller.ts
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BillingService } from './billing.service';
import { CreateQrDepositDto } from './dto/create-qr-deposit.dto';
  import { VerifyCryptoDepositDto } from './dto/verify-crypto-deposit.dto';
import { MockConfirmQrDto } from './dto/mock-confirm-qr.dto';

function getUserIdFromRequest(req: any): number {
  const user = req.user;
  const id = user?.id ?? user?.userId ?? user?.sub;
  if (!id) {
    throw new UnauthorizedException('Không tìm thấy userId trong JWT');
  }
  return Number(id);
}

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  // ================== QR BANK ==================

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit/qr')
  async createQrDeposit(@Req() req: any, @Body() dto: CreateQrDepositDto) {
    const userId = getUserIdFromRequest(req);
    return this.billingService.createQrDeposit(userId, dto);
  }

  /**
   * Mock confirm cho TEST:
   * FE hoặc admin có thể call endpoint này sau khi kiểm tra đã nhận tiền
   * body: { "paymentId": 123 }
   */
  @Post('deposit/qr/mock-confirm')
  async mockConfirmQr(@Body() dto: MockConfirmQrDto) {
    return this.billingService.confirmQrDepositByPaymentId(dto.paymentId);
  }

  // ================== CRYPTO ==================

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit/crypto/verify')
  async verifyCryptoDeposit(
    @Req() req: any,
    @Body() dto: VerifyCryptoDepositDto,
  ) {
    const userId = getUserIdFromRequest(req);
    return this.billingService.verifyCryptoDeposit(userId, dto);
  }
}
