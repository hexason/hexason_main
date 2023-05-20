import { InjectRepository } from '@nestjs/typeorm';
import { Goods, Order } from '../models';
import { Repository } from 'typeorm';

export class OrderService {
  constructor(
    @InjectRepository(Order) readonly orderRepo: Repository<Order>,
    @InjectRepository(Goods) readonly goodsRepo: Repository<Goods>,
  ) {}

  async createOrder() {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const dayOfWeek = currentDate.getDay();

    const formattedMonth = month.toString().padStart(2, '0');
    const formattedDayOfWeek = dayOfWeek.toString().padStart(2, '0');

    const dateId = `${formattedMonth}${formattedDayOfWeek}`;

    const orderCount = await this.orderRepo.count({});
    const order = this.orderRepo.create({
      shortId: `${orderCount.toString(32)}${dateId}`,
      userId: '12345',
      username: 'JohnDoe',
      address_city: 'New York',
      address_district: 'Manhattan',
      address_street: '123 Main Street',
      address_info: 'Apartment 4B',
      contact_phone: '123-456-7890',
      contact_email: 'johndoe@example.com',
      additional_info: 'Please deliver to the front desk',
      supplierId: '6789',
      supplier_info: 'Supplier XYZ',
      description: 'Order for office supplies',
      status: 1,
      totalProductPrice: 10000000009.5,
      totalDeliveryPrice: 10000000009.5,
      totalPrice: 10000000009.5,
      paymentStatus: 2,
      paidAt: '2023-05-20T10:30:00Z',
      createdAt: '2023-05-20T10:00:00Z',
      updatedAt: '2023-05-20T10:15:00Z',
    });
    await this.orderRepo.save(order);

    return order;
  }
}
