import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Goods, Order } from '../models';
import { OrderService } from '../services/OrderService.service';
import { CurrentUserGQL, CustomerAuth } from '@/modules/auth';
import { ItemOrderCreate, OrderCreateArgument } from '../gql/OrderQL';
import { ItemService } from '@/modules/shop/services';

@CustomerAuth()
@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService, private readonly itemService: ItemService) {}

  @Query(() => [Order])
  async getOrders(@CurrentUserGQL() user: any) {
    if (user.sub === 'unknown') return [];
    const order = await this.orderService.getOrders(user.sub);
    return order;
  }
  
  @Query(() => [Goods])
  async getGoods(@CurrentUserGQL() user: any) {
    if (user.sub === 'unknown') return [];
    const orders = await this.orderService.getOrders(user.sub);
    const goods = orders.reduce((goods, order) => goods.concat(order.goods.map(good=> ({...good, order: order}))), [] as Goods[])
    return goods;
  }

  @Mutation(() => Order)
  async createOrder(@Args('data') data: OrderCreateArgument, @CurrentUserGQL() user: any) {
    if (user.sub === 'unknow') throw { code: '4444', message: 'NOT_ABLE_TO_ORDER' };

    const itemsHash = data.items.reduce((acc, itt) => {
      acc[itt.SKU] = itt;
      return acc;
    }, {} as { [x: string]: ItemOrderCreate });
    const items = await this.itemService.getItemsBySKU(Object.keys(itemsHash));
    const products = items.map((el) => ({ ...el.toJSON(), quantity: itemsHash[el.SKU].quantity }));

    const order = await this.orderService.createOrder({
      userId: user.sub,
      username: data.username,
      address_city: data.address_city,
      address_district: data.address_district,
      address_street: data.address_street,
      address_info: data.additional_info,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      additional_info: data.additional_info,
      description: data.description,
      products,
    });
    return order;
  }
}
