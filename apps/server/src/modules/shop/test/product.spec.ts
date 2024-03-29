import { Test } from '@nestjs/testing';
import { ShopModule } from '../shop.module';
import { AuthModule } from '@/modules/auth';
import { ProductService, ItemService } from '../services';
import { CoreModule } from '@/config';
import { readFileSync } from 'fs';
import { IntegrationModule } from '@/modules/integration/integration.module';

describe('Product Tester', () => {
  let prodS: ProductService;
  let itemS: ItemService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [ShopModule, IntegrationModule, AuthModule, ...CoreModule],
    });
    prodS = (await moduleRef.compile()).get(ProductService);
    itemS = (await moduleRef.compile()).get(ItemService);
  });

  describe('Product Items tester', () => {
    it('must defined', async () => {
      const dataItem = JSON.parse(readFileSync(__dirname + '/examples/items.json', { encoding: 'utf-8' }));
      await itemS
        .createItemModel(dataItem[2])
        .then((data) => {
          console.log(data);
        })
        .catch((e) => expect(e.code).toBe(11000));
    });
    it('must have products', async () => {
      const products = await prodS.getProducts();
      expect(products.count).toBeGreaterThan(0);
    });
    it('integrated product check', async () => {
      const product = await prodS.getOneProductById('6479a0345446ee3dc5d80509');
      console.log(product.variations);
      expect(product).toBeDefined();
    });
  });
});
