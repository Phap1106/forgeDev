import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  username?: string;

  @IsOptional()
  fullName?: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
