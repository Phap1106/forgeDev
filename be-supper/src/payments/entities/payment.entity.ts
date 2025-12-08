// src/payments/entities/payment.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  // user nạp ví / thanh toán
  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number | null;

  // Khóa ngoại tới orders.id
  @Column({ name: 'order_id', type: 'int', nullable: true })
  orderId?: number | null;

  @ManyToOne(() => Order, (order) => order.payments, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'order_id' })
  order?: Order | null;

  @Column({ name: 'payment_method_id', type: 'int', nullable: true })
  paymentMethodId?: number | null;

  // ví dụ: 'vietqr', 'etherscan_v2'
  @Column({
    name: 'provider',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  provider?: string | null;

  @Column({ name: 'amount_dollar', type: 'int' })
  amountDollar: number;

  @Column({ name: 'currency', type: 'char', length: 3, default: 'USD' })
  currency: string;

  // pending | success | failed | refund
  @Column({ name: 'status', type: 'varchar', length: 20 })
  status: string;

  // mã giao dịch bên provider: txHash (crypto) hoặc orderId (VietQR)
  @Column({
    name: 'provider_txn_id',
    type: 'varchar',
    length: 255,
    nullable: true,
    default: null,
  })
  providerTxnId?: string | null;

  @Column({ name: 'raw_response', type: 'text', nullable: true })
  rawResponse?: string | null;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
