// src/blog/entities/blog-post.entity.ts
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

@Entity('blog_posts')
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  // author_id
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'author_id' })
  author?: User | null;

  @Column({ length: 255 })
  title: string;

  @Column({ length: 255, unique: true })
  slug: string;

  @Column({ type: 'text', nullable: true })
  excerpt?: string | null;

  @Column({ type: 'text', nullable: true })
  content?: string | null;

  // 3 cột dưới QUAN TRỌNG: phải là string (varchar), KHÔNG phải Object/any
  @Column({
    name: 'cover_image_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  coverImageUrl?: string | null;

  @Column({
    name: 'thumbnail_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  thumbnailUrl?: string | null;

  @Column({
    name: 'video_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  videoUrl?: string | null;

  @Column({ default: 'draft' })
  status: string; // draft, published, ...

  @Column({ name: 'scheduled_at', type: 'timestamp', nullable: true })
  scheduledAt?: Date | null;

  @Column({ name: 'published_at', type: 'timestamp', nullable: true })
  publishedAt?: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', nullable: true })
  createdAt?: Date | null;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date | null;
}
