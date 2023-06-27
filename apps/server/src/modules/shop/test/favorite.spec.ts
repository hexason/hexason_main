import { Test } from '@nestjs/testing';
import { AuthModule } from '@/modules/auth';
import { CoreModule } from '@/config';
import { FavoriteService } from '../services';
import { ShopModule } from '@/modules/shop/shop.module';
import { ProductService } from '@/modules/shop/services';

describe('Basket Tester', () => {
  let service: FavoriteService;
  let productService: ProductService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [ShopModule, AuthModule, ...CoreModule],
    });
    service = (await moduleRef.compile()).get(FavoriteService);
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
      const data = await service.updateFavorite('123', {
        productIds: ['6480391e89094e5583381364', '647ff7e8cbd62ab129fbb49f'],
      });
      console.log(data);
      expect(data).toBeDefined();
    });
  });
});
