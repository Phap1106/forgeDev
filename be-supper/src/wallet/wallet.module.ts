// src/wallet/wallet.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../users/user.entity';
import { Order } from '../orders/entities/order.entity';
import { Payment } from '../payments/entities/payment.entity';

import { UserWallet } from './entities/user-wallet.entity';
import { WalletTransaction } from './entities/wallet-transaction.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserWallet,
      WalletTransaction,
      Order,
      Payment,
    ]),
  ],
  controllers: [WalletController],
  providers: [WalletService],
  exports: [TypeOrmModule, WalletService],
})
export class WalletModule {}
