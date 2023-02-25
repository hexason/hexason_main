import { Body, Controller, Get, HttpException, Param, Post, UseGuards } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '../models/product.model';
import { DataSource } from 'typeorm';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductAddDTO } from './dto/ProductControllerDto';
import { ProductImages } from '../models';

@Controller('product')
export class ProductController {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) { }



  @Get()
  async getProducts() {
    const queryRunner = this.dataSource.createQueryRunner();
    const products = await queryRunner.query(
      'SELECT * FROM product WHERE status = $1 ORDER BY "createdAt" DESC',
      ['active'],
    );
    const count = await queryRunner.query(
      'SELECT COUNT(*) FROM product WHERE status = $1',
      ['active'],
    );
    return {
      count,
      items: products,
    };
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    const prodRepo = this.dataSource.getRepository(Product);
    const product = await prodRepo.findOne({
      where: {
        id: id.toString(),
      },
      relations: ['images'],
    });
    if (!product) throw new HttpException('Product not found', 404);
    return product;
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('create')
  async productAdd(@Body() {
    title,
    description,
    oldPrice,
    price,
    image,
    itemType,
    status,
    brand,
    images
  }: ProductAddDTO) {
    const prodRepo = this.dataSource.getRepository(Product)
    const prodImageRepo = this.dataSource.getRepository(ProductImages)
    const prod = prodRepo.create({
      title,
      description,
      oldPrice,
      price,
      sold: 0,
      status,
      image,
      brand,
      itemType
    });
    const prodImages = images.map(url => prodImageRepo.create({
      image: url
    }));
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(prodImages);
      prod.images = prodImages;
      await queryRunner.manager.save(prod);
      await queryRunner.commitTransaction();
      return prod;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new HttpException("SOMETHING_WENT_WRONG", 500)
    }
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('edit/:id')
  async productUpdate(@Param("id") id: string, @Body() {
    title,
    description,
    oldPrice,
    price,
    image,
    itemType,
    status,
    brand,
    images
  }: ProductAddDTO) {
    const prodRepo = this.dataSource.getRepository(Product)
    const prodImageRepo = this.dataSource.getRepository(ProductImages)
    const prod = await prodRepo.findOneBy({ id });
    if (!prod) throw new HttpException("NOT_FOUND_PROD", 404);
    const prodImages = images.map(url => prodImageRepo.create({
      image: url
    }));
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(prodImages);
      prod.images = prodImages;
      prod.title = title,
      prod.description = description,
      prod.oldPrice = oldPrice,
      prod.price = price,
      prod.image = image,
      prod.itemType = itemType,
      prod.status = status,
      prod.brand = brand,
      await queryRunner.manager.save(prod);
      await queryRunner.commitTransaction();
      return prod;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw new HttpException("SOMETHING_WENT_WRONG", 500)
    }
  }
}
