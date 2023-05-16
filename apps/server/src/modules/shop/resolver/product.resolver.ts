import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models';
import { ProductService, ItemService } from '../services';
import { ProductListArgs } from '../validation/ProductArgs';
import { ProductList } from '../gql/ProductQL';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService, private readonly itemService: ItemService) {}

  @Query(() => ProductList)
  async getProducts(@Args() args: ProductListArgs) {
    const filter: Partial<Product> = {
      status: 12,
    };

    const products = await this.productService.getProducts({
      filter,
      limit: args,
    });
    return products;
  }
}
