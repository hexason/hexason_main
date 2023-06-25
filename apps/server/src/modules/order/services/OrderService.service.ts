import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Goods, Order } from '../models';
import { DataSource, Repository } from 'typeorm';
import * as moment from 'moment';
import { Item, Product } from '@/modules/shop/models';

export class OrderService {
  constructor(
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    @InjectRepository(Goods) private readonly goodsRepo: Repository<Goods>,
    @InjectDataSource() private readonly ds: DataSource,
  ) {}

  async getOrders(userId: string) {
    const orders = await this.orderRepo.find({
      where: {
        userId,
      },
      relations: {
        goods: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    return orders;
  }

  async createOrder({
    userId,
    username,
    address_city,
    address_district,
    address_street,
    address_info,
    contact_phone,
    contact_email,
    additional_info,
    description,
    products,
  }) {
    const orderCount = await this.orderRepo.count({});
    const shortId = `${('00' + orderCount).slice(-3)}${moment('2023-04-01 08:00').format('MDHH')}`;

    let totalProductPrice = 0;
    const goods = products.map((el: Item & { quantity: number }) => {
      const p = el.product as Product;
      totalProductPrice += el.price * el.quantity;
      return {
        productId: p.id,
        productImage: p.image,
        SKU: el.SKU,
        productTitle: p.title,
        productPrice: el.price,
        productQuantity: el.quantity,
        productDetail: JSON.stringify(el.variations),
        productUrl: null,
        totalPrice: el.price * el.quantity,
        status: 0,
      };
    });

    const order = this.orderRepo.create({
      shortId,
      userId,
      username,
      address_city,
      address_district,
      address_street,
      address_info,
      contact_phone,
      contact_email,
      additional_info,
      description,
      status: 0,
      totalProductPrice,
      totalDeliveryPrice: 0,
      totalPrice: totalProductPrice,
      paymentStatus: 0,
      paidAt: null,
      goods,
    });

    await this.ds.transaction(async (t) => {
      await t.save(order);
    });

    return order;
  }
}
