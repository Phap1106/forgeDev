// src/support/entities/support-message.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { SupportTicket } from './support-ticket.entity';
import { User } from '../../users/user.entity';

export type SupportMessageSender = 'user' | 'admin';

@Entity('support_messages')
export class SupportMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'ticket_id', type: 'int' })
  ticketId: number;

  @ManyToOne(() => SupportTicket, (ticket) => ticket.messages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ticket_id' })
  ticket: SupportTicket;

  @Column({ name: 'user_id', type: 'int', nullable: true })
  userId?: number | null;

 @ManyToOne(() => User, { onDelete: 'CASCADE' })
user: User;

  @Column({
    name: 'sender',
    type: 'varchar',
    length: 20,
  })
  sender: SupportMessageSender;

  @Column({
    name: 'message',
    type: 'text',
  })
  message: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
