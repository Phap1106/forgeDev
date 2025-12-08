import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('me')
  getMyWallet(@CurrentUser() user: User) {
    return this.walletService.getBalance(user.id);
  }

  // ADMIN test deposit nhanh để thưởng user (sau có thể chuyển sang route admin)
  @Post('deposit')
  deposit(
    @CurrentUser() user: User,
    @Body() body: { amount: number },
  ) {
    return this.walletService.deposit(user.id, body.amount, {
      reason: 'manual_deposit',
    });
  }

  @Get('transactions')
  listMyTx(@CurrentUser() user: User) {
    return this.walletService.listTransactions(user.id);
  }
}
