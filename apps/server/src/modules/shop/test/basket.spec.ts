import { Test } from '@nestjs/testing';
import { AuthModule } from '@/modules/auth';
import { CoreModule } from '@/config';
import { BasketService } from '../services';
import { ShopModule } from '@/modules/shop/shop.module';
import { ProductService } from '@/modules/shop/services';

describe('Basket Tester', () => {
  let service: BasketService;
  let productService: ProductService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [ShopModule, AuthModule, ...CoreModule],
    });
    service = (await moduleRef.compile()).get(BasketService);
    productService = (await moduleRef.compile()).get(ProductService);
  });

  const productData = [
    {
      productId: '643f7f05dcf40582212334f4',
      userId: '123',
    },
    {
      productId: '643f7f71ac705a8f011c4b65',
      userId: '123',
    },
  ];

  describe('Product Run', () => {
    it('must defined', async () => {
      const product = await productService.getOneProductById(productData[0].productId);
      if (!product) throw 'fail_to_found_product';
      const data = await service.updateBasket('123', {
        product,
        quantity: 5,
      });
      console.log(data);
      expect(data).toBeDefined();
    });
  });
});
