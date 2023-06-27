import { CurrentUserGQL, CustomerAuth } from '@/modules/auth';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressService } from '../services/Address.service';
import { UserAddress } from '../models';
import { AddressInputQL } from '../gql/AddressQL';

@CustomerAuth()
@Resolver()
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => [UserAddress])
  async getAllAddress(@CurrentUserGQL() user: any) {
    if (user.sub === 'unknow') return [];
    const address = await this.addressService.getAllAddress(user.sub);
    return address;
  }

  @Mutation(() => [UserAddress])
  async createAddress(@CurrentUserGQL() user: any, @Args('data') data: AddressInputQL) {
    if (user.sub === 'unknow') return [];
    await this.addressService.createAddress(user.sub, data);
    return await this.addressService.getAllAddress(user.sub);
  }

  @Mutation(() => [UserAddress])
  async updateAddress(@CurrentUserGQL() user: any, @Args('id') id: string, @Args('data') data: AddressInputQL) {
    if (user.sub === 'unknow') return [];
    await this.addressService.updateAddress(id, data);
    return await this.addressService.getAllAddress(user.sub);
  }
}
