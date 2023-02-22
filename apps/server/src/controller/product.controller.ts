import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '../models/product.model';
import { DataSource } from 'typeorm';

@Controller('product')
export class ProductController {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource) { }

  @Get('')
  async getProducts() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const products = await queryRunner.query('SELECT * FROM product WHERE status = $1 ORDER BY "createdAt" DESC', ['active']);
    const count = await queryRunner.query('SELECT COUNT(*) FROM product WHERE status = $1', ['active']);

    return {
      count,
      items: products,
    };
  }

  @Get(":id")
  async getProduct(@Param('id') id: string) {
    const prodRepo = this.dataSource.getRepository(Product);
    const product = await prodRepo.findOneBy({id: id.toString()});
    if(!product) throw new HttpException('Product not found', 404);
    return product;
  }
}
