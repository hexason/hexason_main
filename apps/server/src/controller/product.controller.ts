import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  Request,
  SetMetadata
} from '@nestjs/common';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductAddDTO } from './dto/ProductControllerDto';
import { ProductService } from '@/service';
import { SupabaseJWTPayload } from '@/lib/interfaces';
import { Admin } from '@/lib/models';

@UseGuards(AdminJWTGuard)
@ApiBearerAuth('admin-access')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService) { }

  @Get("list")
  @SetMetadata('isPublic', true)
  async getProducts() {
    const products = await this.productService.getProducts();
    return {
      count: products.length,
      items: products,
    };
  }

  @Get(':id')
  @SetMetadata('isPublic', true)
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getOneProductById(id)
      .catch(e => { throw new HttpException(e, 400) });
    return product;
  }

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
