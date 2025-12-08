// src/support/entities/support-ticket.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SupportMessage } from './support-message.entity';
import { User } from '../../users/user.entity';

export type SupportTicketCategory =
  | 'general'
  | 'billing'
  | 'technical'
  | 'product'
  | 'other';

export type SupportTicketStatus =
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed';

@Entity('support_tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number | null;

  @ManyToOne(() => User, (user) => user.supportTickets, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @Column({
    name: 'category',
    type: 'varchar',
    length: 50,
    nullable: true,
    default: null,
  })
  category?: SupportTicketCategory | null;

  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
  })
  title: string;

  @Column({
    name: 'status',
    type: 'varchar',
    length: 30,
    default: 'open',
  })
  status: SupportTicketStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => SupportMessage, (msg) => msg.ticket)
  messages: SupportMessage[];
}
