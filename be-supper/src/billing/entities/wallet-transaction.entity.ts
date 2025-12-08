// src/billing/entities/wallet-transaction.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type WalletTxType =
  | 'deposit'
  | 'purchase'
  | 'refund'
  | 'bonus'
  | 'adjustment';

@Entity('wallet_transactions')
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'type' })
  type: WalletTxType;

  @Column({ name: 'amount_dollar', type: 'integer' })
  amountDollar: number;

  @Column({ name: 'balance_after', type: 'integer' })
  balanceAfter: number;

  @Column({ name: 'order_id', type: 'integer', nullable: true })
  orderId?: number | null;

  @Column({ name: 'payment_id', type: 'integer', nullable: true })
  paymentId?: number | null;

  @Column({ name: 'meta', type: 'text', nullable: true })
  meta?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
