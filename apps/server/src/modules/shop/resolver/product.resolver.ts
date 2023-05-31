import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models';
import { ProductService, ItemService } from '../services';
import { ProductListArgs } from '../validation/ProductArgs';
import { ProductList } from '../gql/ProductQL';
import { HttpException, Inject, NotFoundException, Optional } from '@nestjs/common';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService, private readonly itemService: ItemService) {}

  @Query(() => ProductList)
  async getProducts(@Args() args?: ProductListArgs) {
    let filter: Partial<Product> = {
      status: 12,
    };
    if (!args) args = {};
    if (args && args.filter) {
      filter = { ...filter, ...args.filter };
    }

    const products = await this.productService.getProducts({
      filter,
      ...args.options,
    });
    return products;
  }

  @Query(() => Product)
  async getProductById(@Args('id') id: string) {
    let product = await this.productService.getOneProductById(id);
    return product;
  }
}
