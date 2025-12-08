// src/billing/dto/mock-confirm-qr.dto.ts
import { IsInt } from 'class-validator';

export class MockConfirmQrDto {
  @IsInt()
  paymentId: number;
}
