import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  UseGuards,
  Request,
  SetMetadata,
  Put
} from '@nestjs/common';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductAddDTO, ProductInfoUpdateDTO, ProductItemUpdateDto } from './dto/ProductControllerDto';
import { ItemService, ProductService } from '@/service';
import { SupabaseJWTPayload } from '@/lib/interfaces';
import { Admin } from '@/lib/models';

@UseGuards(AdminJWTGuard)
@ApiBearerAuth('admin-access')
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly itemService: ItemService
  ) { }

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
      brand,
      images
    }: ProductAddDTO,
    @Request() req: any
  ) {
    const user = req.user as SupabaseJWTPayload & { admin: Admin }
    const product = await this.productService.createProduct({
      "title": title,
      "image": image,
      "description": description,
      "bgColor": bgColor,
      "brand": brand,
      "images": images,
      "supplier": user.admin.supplier[0].supplierId,
      "price": 0,
      "discount": 0,
      "sold": 0,
      "quantity": 0,
      "status": 0,
      "category": [],
      "options": [],
      "items": []
    })
    return product;
  }

  @Put(':id/info')
  async productUpdate(
    @Param('id') id: string,
    @Body() data: ProductInfoUpdateDTO,
  ) {
    try {
      const product = await this.productService.getOneProductById(id);
      return await this.productService.updateProduct(product, data);
    } catch (e) {
      if (e.code) throw new HttpException(e, 400)
      throw e;
    }
  }

  @Put(':id/item')
  async productItemUpdate(
    @Param('id') id: string,
    @Body() data: ProductItemUpdateDto
  ) {
    const product = await this.productService.getOneProductById(id);
    if (!product) throw new HttpException({ code: "NOT_FOUND_DATA", message: "Product not found" }, 404)
    const items = await this.itemService.getItemsByProductId(id);
    let item = items.find(i => i.id === data.id);
    if (!item) {
      item = this.itemService.createItemModel(data);
      product.items.push(item._id as any);
    }
    item.product = product._id;
    await item.save();
    await product.save();

    return item;
  }
}
