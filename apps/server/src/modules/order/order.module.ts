import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as models from './models';
import { OrderService } from './services/order.service';

@Module({
  imports: [TypeOrmModule.forFeature(Object.values(models))],
  providers: [OrderService],
  exports: [],
})
export class OrderModule {}
