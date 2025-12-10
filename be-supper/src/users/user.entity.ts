// src/users/user.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { BlogPost } from 'src/blog/entities/blog-post.entity';
import { Order } from 'src/orders/entities/order.entity';
import { SupportTicket } from 'src/support/entities/support-ticket.entity';
import { SupportMessage } from 'src/support/entities/support-message.entity';
import { UserWallet } from 'src/wallet/entities/user-wallet.entity';
import { WalletTransaction } from 'src/wallet/entities/wallet-transaction.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  username?: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'full_name', nullable: true })
  fullName?: string;

  @Column({ default: 'user', comment: 'user, admin' })
  role: string;

  @Column({ default: 'active' })
  status: string;

  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl?: string;

  @Column({ name: 'last_login_at', type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date;
  /* ========== QUAN HỆ ========== */

  // blog_posts.author_id
  @OneToMany(() => BlogPost, (post) => post.author)
  blogPosts: BlogPost[];

  // orders.user_id
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // support_tickets.user_id
  @OneToMany(() => SupportTicket, (ticket) => ticket.user)
  supportTickets: SupportTicket[];

  // support_messages.user_id
  @OneToMany(() => SupportMessage, (message) => message.user)
  supportMessages: SupportMessage[];

  // user_wallets.user_id (UNIQUE) => 1–1
  @OneToOne(() => UserWallet, (wallet) => wallet.user)
  wallet: UserWallet;

  // wallet_transactions.user_id
  @OneToMany(() => WalletTransaction, (tx) => tx.user)
  walletTransactions: WalletTransaction[];
}


