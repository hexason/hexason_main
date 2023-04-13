import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  Request
} from '@nestjs/common';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductAddDTO } from './dto/ProductControllerDto';
import { ProductService } from '@/service';
import { SupabaseJWTPayload } from '@/lib/interfaces';
import { Admin } from '@/lib/models';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService) { }

  @Get("list")
  async getProducts() {
    const products = await this.productService.getProducts();
    return {
      count: products.length,
      items: products,
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getOneProductById(id)
      .catch(e => { throw new HttpException(e, 400) });
    return product;
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('create')
  async productAdd(
    @Body()
    {
      title,
      image,
      description,
      bgColor,
      category,
      brand,
      price,
      discount,
      sold,
      quantity,
      status,
      supplier,
      options,
      images
    }: ProductAddDTO,
    @Request() req: any
  ) {
    const user = req.user as SupabaseJWTPayload & { admin: Admin }
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('edit/:id')
  async productUpdate(
    @Param('id') id: string,
    @Body()
    {
      title,
      image,
      description,
      bgColor,
      category,
      brand,
      price,
      discount,
      sold,
      quantity,
      status,
      supplier,
      options,
      images
    }: ProductAddDTO,
  ) {
    return {}
  }
}
