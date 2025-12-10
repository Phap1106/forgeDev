// src/tools/entities/tool.entity.ts
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';
import { ToolRentalPackage } from './tool-rental-package.entity';

@Entity('tools')
export class Tool extends BaseTimeEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ name: 'price_vnd', type: 'int', default: 0 })
  priceVnd: number;

  @Column({ name: 'billing_mode', type: 'varchar', length: 50, default: 'one_time' })
  billingMode: string; // one_time | rental

  @Column({ name: 'delivery_type', type: 'varchar', length: 50, default: 'download' })
  deliveryType: string; // online | download

  @Column({ name: 'hourly_price', type: 'int', nullable: true })
  hourlyPrice?: number;

  // FIX LỖI 100%
  @Column({
    name: 'rental_strategy',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  rentalStrategy?: string; // fixed_packages | user_choose

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'price_label', nullable: true })
  priceLabel?: string;

  @Column({ name: 'hero_image_url', nullable: true })
  heroImageUrl?: string;

  @Column({ name: 'live_badge_text', nullable: true })
  liveBadgeText?: string;

  @Column({ nullable: true })
  difficulty?: string;

  @Column({ nullable: true })
  environment?: string;

  @Column({ name: 'update_policy', type: 'text', nullable: true })
  updatePolicy?: string;

  @Column({ name: 'suited_for', type: 'text', nullable: true })
  suitedFor?: string;

  @Column({ type: 'varchar', length: 50, default: 'public' })
  visibility: string;

  @Column({ type: 'varchar', length: 50, default: 'draft' })
  status: string;

  @OneToMany(() => ToolRentalPackage, (p) => p.tool, {
    cascade: true,
  })
  rentalPackages: ToolRentalPackage[];
}
