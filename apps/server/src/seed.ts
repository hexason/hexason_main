import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './service/app.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appService = app.get(AppService);
  await appService.runSeeds();
  const logger = new Logger('bootstrap');

  logger.log('Successfully seeded database');
  return;
}
bootstrap();
