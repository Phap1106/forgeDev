// src/tools/entities/tool-rental-package.entity.ts
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseTimeEntity } from '../../common/base.entity';
import { Tool } from './tool.entity';

@Entity('tool_rental_packages')
export class ToolRentalPackage extends BaseTimeEntity {
  @ManyToOne(() => Tool, (t) => t.rentalPackages, { onDelete: 'CASCADE' })
  tool: Tool;

  @Column()
  code: string; // 1d, 7d, 1m, 3m, 1y, lifetime

  @Column()
  label: string;

  @Column({ name: 'duration_hours', type: 'int' })
  durationHours: number;

  @Column({ name: 'price_vnd', type: 'int' })
  priceVnd: number;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;
}
