// src/billing/entities/coupon.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity('coupons')
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  // thêm phần này
  @OneToMany(() => Order, (order: Order) => order.coupon)
  orders: Order[];
}
