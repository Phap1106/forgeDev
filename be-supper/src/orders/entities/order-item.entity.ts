// src/orders/entities/order-item.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order: Order) => order.items, {
    onDelete: 'CASCADE',
  })
  order: Order;

  @Column({ name: 'product_type', type: 'varchar', length: 50 })
  productType: string; // ví dụ: 'tool' | 'workflow'

  @Column({ name: 'product_id', type: 'int' })
  productId: number;

  @Column({ name: 'name_snapshot', type: 'varchar', length: 255 })
  nameSnapshot: string;

  @Column({ name: 'price_snapshot', type: 'int' })
  priceSnapshot: number;

  @Column({ name: 'quantity', type: 'int', default: 1 })
  quantity: number;

  @Column({
    name: 'billing_type',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  billingType?: string; // ví dụ: 'one_time' | 'recurring'

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
