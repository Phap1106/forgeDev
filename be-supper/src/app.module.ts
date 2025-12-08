// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BillingModule } from './billing/billing.module';
import { WalletModule } from './wallet/wallet.module';

@Module({
  imports: [
    // Load .env, dùng global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Kết nối MySQL + tự load tất cả entity *.entity.{js,ts}
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST') || 'mysql',
        port: +config.get('DB_PORT') || 3306,
        username: config.get('DB_USER') || 'forge',
        password: config.get('DB_PASS') || 'forge123',
        database: config.get('DB_NAME') || 'forgevault',

        // QUAN TRỌNG: load toàn bộ entity trong dist/src
        entities: [__dirname + '/**/*.entity.{js,ts}'],

        // Không tự sửa schema vì đã có file SQL
        synchronize: false,

        // Có hay không cũng được, để true cho Nest tự đăng ký khi forFeature
        autoLoadEntities: true,
      }),
    }),

    // Các module tính năng
    UsersModule,
    AuthModule,
    BillingModule,
    WalletModule,
  ],
})
export class AppModule {}
