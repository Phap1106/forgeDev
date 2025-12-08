// src/billing/entities/user-wallet.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_wallets')
export class UserWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @Column({ name: 'balance_dollar', type: 'integer', default: 0 })
  balanceDollar: number;

  @Column({ name: 'total_deposit_dollar', type: 'integer', default: 0 })
  totalDepositDollar: number;

  @Column({ name: 'total_bonus_dollar', type: 'integer', default: 0 })
  totalBonusDollar: number;

  @Column({ name: 'total_spent_dollar', type: 'integer', default: 0 })
  totalSpentDollar: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
