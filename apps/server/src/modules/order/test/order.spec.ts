import { Test } from '@nestjs/testing';
import { OrderService } from '../services/OrderService.service';
import { OrderModule } from '../order.module';
import { CoreModule } from '@/config';
import { ShopModule } from '@/modules/shop/shop.module';
import { ItemService } from '@/modules/shop/services';
import { AuthModule } from '@/modules/auth';

describe('Order Testing', () => {
  let service: OrderService;
  let itemS: ItemService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ShopModule, AuthModule, OrderModule, ...CoreModule],
    }).compile();
    service = module.get(OrderService);
    itemS = module.get(ItemService);
  });

  describe('Order Creating test', () => {
    it('should be defined', async () => {
      const item = await itemS.getItemBySKU('ot-s-682880851284-1');
      if (!item) throw 'fail';
      const order = await service.createOrder({
        userId: '123',
        username: 'john_doe',
        address_city: 'New York',
        address_district: 'Manhattan',
        address_street: '123 Main Street',
        address_info: 'Apartment 4B',
        contact_phone: '555-1234',
        contact_email: 'john@example.com',
        additional_info: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        products: [{ ...item.toJSON(), quantity: 1 }],
      });
      console.log(order);
      expect(order).toBeDefined();
    });
  });
});
