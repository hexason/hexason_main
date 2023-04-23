import { Test } from '@nestjs/testing';
import { ShopModule } from '../shop.module';
import { AuthModule } from '@/modules/auth';
import { ProductService } from '../services';
import { CoreModule } from '@/config';

describe('Product Tester', () => {
  let service: ProductService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [ShopModule, AuthModule, ...CoreModule],
    });
    service = (await moduleRef.compile()).get(ProductService);
  });

  describe('Product Run', () => {
    it('must defined', () => {
      expect(service).toBeDefined();
    });
  });
});
