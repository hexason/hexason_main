import { Body, Controller, HttpException, Param, Request, Put } from '@nestjs/common';
import { ItemService, ProductService } from '../services';
import { ProductI, SupabaseJWTPayload } from 'pointes';
import { ProductAddDTO, ProductInfoUpdateDTO, ProductItemUpdateDto } from '../validation/ProductControllerDto';
import { Auth } from '@/modules/auth';
import { TypedRoute } from '@nestia/core';

@Auth()
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService, private readonly itemService: ItemService) {}

  @TypedRoute.Get('list')
  async getProducts(@Request() req: any): Promise<{ items: any[]; count: number }> {
    const filter: Partial<ProductI> = {};
    filter.supplier = req.user.supplier_id;

    const products = await this.productService.getProducts({
      filter,
    });

    return products as any;
  }

  @TypedRoute.Get(':id')
  async getProduct(@Param('id') id: string): Promise<any> {
    const product = await this.productService.getOneProductById(id).catch((e) => {
      throw new HttpException(e, 400);
    });
    return product;
  }

  @TypedRoute.Post('create')
  async productAdd(
    @Body()
    { title, image, description, bgColor, brand, images }: ProductAddDTO,
    @Request() req: any,
  ): Promise<any> {
    const user = req.user as SupabaseJWTPayload & { admin: any };
    const product = await this.productService.createProduct({
      title: title,
      image: image,
      description: description,
      bgColor: bgColor,
      brand: brand,
      images: images,
      supplier: user.admin.supplier[0].supplierId,
      price: 0,
      discount: 0,
      sold: 0,
      quantity: 0,
      status: 0,
      categories: [],
      items: [],
    });
    return product;
  }

  @Put(':id/info')
  async productUpdate(@Param('id') id: string, @Body() data: ProductInfoUpdateDTO) {
    try {
      const product = await this.productService.getOneProductById(id);
      return await this.productService.updateProduct(product as any, data);
    } catch (e) {
      if (e.code) throw new HttpException(e, 400);
      throw e;
    }
  }

  @Put(':id/item')
  async productItemUpdate(@Param('id') id: string, @Body() data: ProductItemUpdateDto) {
    const product = await this.productService.getOneProductById(id);
    if (!product) throw new HttpException({ code: 'NOT_FOUND_DATA', message: 'Product not found' }, 404);
    const items = await this.itemService.getItemsByProductId(id);

    let item: any = items.find((i) => i._id.toString() === data._id);
    if (!item && !data._id) {
      item = this.itemService.createItemModel(data);
      product.items.push(item._id as any);
    }
    if (data._id && data.status === 1 && product) {
      product.items = product.items.filter((it) => it._id.toString() !== data._id);
    }
    if (item) {
      item.product = product._id;
      await item.save();
    }
    await product.populate('items');
    await product.save();
    this.productService.productCatchupItemData(product._id).catch((e) => console.log(e));

    return product.items;
  }
}
