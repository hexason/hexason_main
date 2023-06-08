import { Module } from '@nestjs/common';
import { QrController } from './qr.controller';

@Module({
  imports: [],
  providers: [],
  exports: [],
  controllers: [QrController],
})
export class QrModule {}
