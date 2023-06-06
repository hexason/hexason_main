import { Args, Query, Resolver } from '@nestjs/graphql';
import { Product } from '../models';
import { ObservingService, ProductService } from '../services';
import { ProductListArgs } from '../validation/ProductArgs';
import { ProductList } from '../gql/ProductQL';
import { CurrentUserGQL, CustomerAuth } from '@/modules/auth';

@CustomerAuth()
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService, private readonly obs: ObservingService) {}

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
  async getProductById(@Args('id') id: string, @CurrentUserGQL() user: any) {
    const product = await this.productService.getOneProductById(id);
    this.obs.observeProductById({ productId: product._id, userId: user.sub });
    return product;
  }

  @Query(() => [Product])
  async getHighestViewedProduct() {
    const producs = await this.obs.getHighestViewProducts();
    return producs;
  }

  @Query(() => [Product])
  async recommendProducts() {
    //FIXME: Switch Recommend Product Service
    const products = await this.obs.getHighestViewProducts(2);
    return products;
  }

  @Query(() => [Product])
  async sponsorProducts() {
    //FIXME: Switch Recommend Product Service
    const products = await this.obs.getHighestViewProducts(2);
    return products;
  }
}
