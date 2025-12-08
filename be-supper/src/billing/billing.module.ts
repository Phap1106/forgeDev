// src/billing/billing.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { BlockchainService } from './blockchain.service';

import { UserWallet } from './entities/user-wallet.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { Payment } from '../payments/entities/payment.entity';

// dùng entity PaymentMethod chuẩn ở module payments
import { PaymentMethod } from '../payments/entities/payment-method.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserWallet,
      WalletTransaction,
      PaymentMethod,
      Payment,
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService, BlockchainService],
  exports: [BillingService],
})
export class BillingModule {}
