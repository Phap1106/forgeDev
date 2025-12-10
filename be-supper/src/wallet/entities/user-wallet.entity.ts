// src/wallet/entities/user-wallet.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../users/user.entity';

@Entity('user_wallets')
export class UserWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @Column({ name: 'balance_dollar', type: 'int', default: 0 })
  balanceDollar: number;

  @Column({ name: 'total_deposit_dollar', type: 'int', default: 0 })
  totalDepositDollar: number;

  @Column({ name: 'total_bonus_dollar', type: 'int', default: 0 })
  totalBonusDollar: number;

  @Column({ name: 'total_spent_dollar', type: 'int', default: 0 })
  totalSpentDollar: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
