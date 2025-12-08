import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../users/user.entity';

export async function seedAdmin(app: INestApplication) {
  const config = app.get(ConfigService);
  const userRepo = app.get<Repository<User>>(getRepositoryToken(User));

  const email = config.get<string>('ADMIN_EMAIL');
  const password = config.get<string>('ADMIN_PASSWORD');

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD missing. Skip admin seeding.');
    return;
  }

  // Check exists
  const existed = await userRepo.findOne({ where: { email } });
  if (existed) {
    console.log(`Admin already exists: ${email}`);
    return;
  }

  const hash = await bcrypt.hash(password, 10);

  const admin = userRepo.create({
    email,
    username: 'admin',
    passwordHash: hash,
    fullName: 'Administrator',
    role: 'admin',
    status: 'active',
  });

  await userRepo.save(admin);

  console.log(`Admin created successfully: ${email}`);
}
