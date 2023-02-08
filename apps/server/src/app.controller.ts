import { Controller, Get } from '@nestjs/common';
import { WalletService } from './user/wallet.service';

@Controller()
export class AppController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getHello(): string {
    return 'Working Well!';
  }

  @Get('wallet/combine')
  async combine() {
    return this.walletService.masterCombineTRX();
  }
}
