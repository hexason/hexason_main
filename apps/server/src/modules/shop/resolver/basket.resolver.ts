import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BackpackBasketProductAdd } from '../gql/BackpackQL';
import { CurrentUserGQL, CustomerAuth } from '@/modules/auth';
import { Basket } from '../models';
import { BasketService, ProductService } from '../services';
import { SupabaseJWTPayload } from 'pointes';

@CustomerAuth()
@Resolver()
export class BasketResolver {
  constructor(private readonly productService: ProductService, private readonly basketService: BasketService) {}

  @Mutation(() => [Basket])
  async addToBasket(@Args('data') args: BackpackBasketProductAdd, @CurrentUserGQL() user: SupabaseJWTPayload) {
    if (user.sub === 'unknown') return [];
    const product = await this.productService.getOneProductById(args.productId);
    if (!product) throw { code: '404', message: 'PROD_NOT_FOUND' };
    const basket = await this.basketService.updateBasket(user.sub, { product, quantity: args.quantity });
    return basket;
  }
}
