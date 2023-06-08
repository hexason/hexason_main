import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as models from './models';
import { OrderService } from './services/OrderService.service';
import { ShopModule } from '../shop/shop.module';
import { OrderResolver } from './resolver/order.resolver';

@Module({
  imports: [ShopModule, TypeOrmModule.forFeature(Object.values(models))],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
