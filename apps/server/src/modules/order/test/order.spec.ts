import { Test } from '@nestjs/testing';
import { OrderService } from '../services/order.service';
import { OrderModule } from '../order.module';
import { CoreModule } from '@/config';

describe('Order Testing', () => {
  let service: OrderService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [OrderModule, ...CoreModule],
    }).compile();
    service = module.get(OrderService);
  });

  describe('Order Creating test', () => {
    it('should be defined', async () => {
      const order = await service.createOrder();
      console.log(order);
      expect(order).toBeDefined();
      const result = await service.orderRepo.delete(order);
      expect(result.affected).toEqual(1);
    });
  });
});
