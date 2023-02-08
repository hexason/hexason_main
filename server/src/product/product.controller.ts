import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
  HttpException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJWTGuard } from 'src/middleware/user_jwt.guard';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    return this.productService.findAll();
  }

  @Post(':id/buy')
  @UseGuards(UserJWTGuard)
  @ApiBearerAuth('user-jwt-token')
  async buyProduct(@Param('id') id: string, @Request() { user }) {
    return this.productService.buyProduct(id, user.id).catch((err) => {
      throw new HttpException(err.message, 400);
    });
  }
}
