// src/payments/entities/payment-method.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  label: string;

  @Column({ length: 255 })
  type: string; // qr, wallet, bank

  @Column({ type: 'text', nullable: true })
  details?: string | null; // địa chỉ ví, số tài khoản, hướng dẫn...

  @Column({
    name: 'qr_image_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  qrImageUrl?: string | null;

  @Column({ name: 'is_default', type: 'boolean', default: false })
  isDefault: boolean;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date | null;
}
