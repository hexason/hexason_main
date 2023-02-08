import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './user/user.service';
import { WalletService } from './user/wallet.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const userService = app.get(UserService);
  const walletService = app.get(WalletService);

  await userService.userCheckDeposit();
  await walletService.depositUSDT();

  let jobRunning = false;
  setInterval(async () => {
    if (!jobRunning) {
      jobRunning = true;
      await userService.userCheckDeposit();
      await walletService.depositUSDT();
      jobRunning = false;
    }
  }, 1000 * 60 * 5);
}

bootstrap();
