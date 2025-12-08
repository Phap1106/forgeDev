// be-supper/src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';

export type JwtPayload = {
  sub: number;
  email: string;
  role: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    // Định nghĩa rõ kiểu options để TS không hiểu nhầm
    const opts: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // LƯU Ý: đúng key env là 'JWT_SECRET', không phải 'JWT SECRET'
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    };

    super(opts);
  }

  async validate(payload: JwtPayload) {
    // payload = { sub, email, role }
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
