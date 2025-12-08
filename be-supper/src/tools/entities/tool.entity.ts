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

  @Column({ name: 'base_price_vnd', type: 'int' })
  basePriceVnd: number;

  @Column({ name: 'short_description', type: 'varchar', length: 255, nullable: true })
  shortDescription?: string | null;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string | null;

  @Column({ name: 'thumbnail_url', type: 'text', nullable: true })
  thumbnailUrl?: string | null;

  @Column({ name: 'hero_image_url', type: 'text', nullable: true })
  heroImageUrl?: string | null;

  @Column({ name: 'demo_video_url', type: 'text', nullable: true })
  demoVideoUrl?: string | null;

  @Column({ name: 'tags', type: 'simple-array', nullable: true })
  tags?: string[] | null;

  @Column({ name: 'max_concurrent_devices', type: 'int', default: 1 })
  maxConcurrentDevices: number;

  @Column({ name: 'is_featured', default: false })
  isFeatured: boolean;

  @Column({ name: 'changelog', type: 'text', nullable: true })
  changelog?: string | null;

  @Column({ name: 'update_policy', type: 'text', nullable: true })
  updatePolicy?: string | null;

  @Column({ name: 'suited_for', type: 'text', nullable: true })
  suitedFor?: string | null;

  @Column({ default: 'public' })
  visibility: string; // public, admin

  @Column({ default: 'draft' })
  status: string; // draft, active, archived

  @OneToMany(() => ToolRentalPackage, (p) => p.tool, { cascade: true })
  rentalPackages: ToolRentalPackage[];
}
