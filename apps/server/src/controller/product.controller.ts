import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductAddDTO } from './dto/ProductControllerDto';

@Controller('product')
export class ProductController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

  @Get()
  async getProducts() {
    return {
      count: 0,
      items: [],
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return {id};
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('create')
  async productAdd(
    @Body()
    {
      title,
      description,
      oldPrice,
      price,
      image,
      itemType,
      quantity,
      status,
      brand,
      images,
    }: ProductAddDTO,
  ) {
    return {}
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('edit/:id')
  async productUpdate(
    @Param('id') id: string,
    @Body()
    {
      title,
      description,
      oldPrice,
      price,
      image,
      itemType,
      status,
      quantity,
      brand,
      images,
    }: ProductAddDTO,
  ) {
   return {}
  }
}
