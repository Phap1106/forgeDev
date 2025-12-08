// src/wallet/entities/wallet-transaction.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('wallet_transactions')
export class WalletTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column()
  type: string;

  @Column({ name: 'amount_dollar', type: 'int' })
  amountDollar: number;

  @Column({ name: 'balance_after', type: 'int' })
  balanceAfter: number;

  @ManyToOne(() => Order, { nullable: true })
  order?: Order | null;

  @ManyToOne(() => Payment, { nullable: true })
  payment?: Payment | null;

  @Column({ type: 'text', nullable: true })
  meta?: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
