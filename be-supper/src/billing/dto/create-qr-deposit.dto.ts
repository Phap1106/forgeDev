// src/billing/dto/create-qr-deposit.dto.ts
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateQrDepositDto {
  @IsInt()
  @Min(1)
  amountDollar: number;

  @IsInt()
  paymentMethodId: number;

  @IsOptional()
  @IsString()
  description?: string;
}
