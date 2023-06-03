import { Test } from '@nestjs/testing';
import { ShopModule } from '../shop.module';
import { AuthModule } from '@/modules/auth';
import { ProductService, ItemService } from '../services';
import { CoreModule } from '@/config';
import { readFileSync } from 'fs';

describe('Product Tester', () => {
  let prodS: ProductService;
  let itemS: ItemService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [ShopModule, AuthModule, ...CoreModule],
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
  });
});
