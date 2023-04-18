import { AppModule } from '@/app.module';
import { ItemService, ProductService } from '@/service';
import { Test } from '@nestjs/testing';

describe('Product Service', () => {
  let productService: ProductService;
  let itemService: ItemService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
    itemService = moduleRef.get<ItemService>(ItemService);
  });

  describe('getProducts', () => {
    it('should return an array of product', async () => {
      const products = await productService.getProducts();
      expect(products[0]).toBeDefined();
      const item = itemService.createItemModel({
        configName: 'test',
        altTxt: 'test',
        image: '',
        status: 12,
        sku: Date.now().toString(),
        upc: '1234',
        price: 1000,
        stock: 10,
        product: products[0].id,
      });
      await item.save();

      expect(item.configName).toBe('test');
    });
  });
});
