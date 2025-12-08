// src/billing/dto/verify-crypto-deposit.dto.ts
import { IsInt, IsString, Min } from 'class-validator';

export class VerifyCryptoDepositDto {
  @IsInt()
  paymentMethodId: number;

  @IsString()
  txHash: string;

  // số tiền nội bộ (USD/USDT) muốn cộng vào ví
  @IsInt()
  @Min(1)
  amountDollar: number;
}
