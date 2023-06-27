import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FavoriteService } from '../services';
import { Product } from '../models';
import { CurrentUserGQL, CustomerAuth } from '@/modules/auth';
import { BackpackFavoriteProductUpdate } from '../gql/BackpackQL';

@CustomerAuth()
@Resolver()
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Query(() => [Product])
  async getFavoriteProducts(@CurrentUserGQL() user: any) {
    if (user.sub === 'unknown') return [];
    const products = await this.favoriteService.getFavoriteProducts(user.sub);
    return products;
  }

  @Mutation(() => [Product])
  async updateFavoriteProducts(@Args('data') data: BackpackFavoriteProductUpdate, @CurrentUserGQL() user: any) {
    if (user.sub === 'unknown') return [];
    const products = await this.favoriteService.updateFavorite(user.sub, { productIds: data.ids });
    return products;
  }
}
