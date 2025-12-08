// src/orders/entities/order.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity'; // nếu project bạn dùng path khác (entities/user.entity) thì chỉnh lại cho đúng
import { Coupon } from '../../billing/entities/coupon.entity';
import { PaymentMethod } from '../../payments/entities/payment-method.entity';

import { OrderItem } from './order-item.entity';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column({ default: 'pending' })
  status: string; // pending, paid, cancelled, refunded

  @Column({ name: 'subtotal_amount', type: 'int' })
  subtotalAmount: number;

  @Column({ name: 'discount_amount', type: 'int', default: 0 })
  discountAmount: number;

  @Column({ name: 'total_amount', type: 'int' })
  totalAmount: number;

  @Column({ default: 'VND' })
  currency: string;

  @ManyToOne(() => Coupon, { nullable: true })
  coupon?: Coupon | null;

  @ManyToOne(() => PaymentMethod, { nullable: true })
  paymentMethod?: PaymentMethod | null;

  @Column({ type: 'text', nullable: true })
  note?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;

  @Column({ name: 'paid_at', type: 'timestamp', nullable: true })
  paidAt?: Date | null;

  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @OneToMany(() => Payment, (payment) => payment.order)
  payments: Payment[];
}
