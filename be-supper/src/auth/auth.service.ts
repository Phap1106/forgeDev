import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  /**
   * Tự tạo tài khoản admin khi khởi động service nếu chưa có.
   * Dùng ADMIN_EMAIL và ADMIN_PASSWORD trong .env
   */
  async onModuleInit() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log(
        '[AuthService] ADMIN_EMAIL hoặc ADMIN_PASSWORD chưa được cấu hình, bỏ qua seed admin.',
      );
      return;
    }

    const existingAdmin = await this.userRepo.findOne({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log(
        `[AuthService] Admin đã tồn tại với email ${adminEmail}, bỏ qua seed.`,
      );
      return;
    }

    const hash = await bcrypt.hash(adminPassword, 10);

    const adminUser = this.userRepo.create({
      email: adminEmail,
      username: 'admin',
      fullName: 'Administrator',
      passwordHash: hash,
      role: 'admin',
      status: 'active',
    });

    await this.userRepo.save(adminUser);
    console.log(`[AuthService] Đã tạo admin mặc định: ${adminEmail}`);
  }

  async register(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new BadRequestException('Email đã tồn tại');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.create({
      email: dto.email,
      username: dto.username,
      fullName: dto.fullName,
      passwordHash: hash,
      role: 'user',
    });

    return this.buildAuthResult(user);
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Sai email hoặc mật khẩu');
    }

    return this.buildAuthResult(user);
  }

  private buildAuthResult(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
