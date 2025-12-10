// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepo.find();
  }

  findById(id: number) {
    return this.usersRepo.findOne({
      where: { id },
    });
  }

  findByEmail(email: string) {
    return this.usersRepo.findOne({
      where: { email },
    });
  }

  async create(data: Partial<User>) {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async update(id: number, data: Partial<User>) {
    const user = await this.usersRepo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const merged = this.usersRepo.merge(user, data);
    return this.usersRepo.save(merged);
  }

  async touchLastLogin(id: number) {
    // tên field có thể là lastLoginAt hoặc last_login_at, tuỳ entity của bạn
    await this.usersRepo.update(id, {
      // nếu entity là lastLoginAt:
      lastLoginAt: new Date(),
      // nếu entity là last_login_at thì sửa lại cho khớp
      // last_login_at: new Date() as any,
    } as any);
  }
}
