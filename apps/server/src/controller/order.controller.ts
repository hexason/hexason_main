import { Body, Controller, Param, Put, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ApiBearerAuth } from '@nestjs/swagger';

import { OrderService } from '../service/order.service';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { OrderStatusChangeDTO } from './dto/OrderControllerDto';

@Controller('order')
export class OrderController {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly orderService: OrderService,
  ) {}

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Put(':id/status')
  async updateVerify(@Param('id') id: string, @Body() { status }: OrderStatusChangeDTO) {
    await this.orderService.orderStatusChange(id, status);
    return {
      success: true,
    };
  }
}
