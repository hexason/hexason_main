import { AppModule } from '@/app.module';
import { ProductService } from '@/service';
import { Test } from '@nestjs/testing';


describe('Product Service', () => {
  let productService: ProductService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
  });

  describe('getProducts', () => {
    it('should return an array of product', async () => {
      expect(await productService.getProducts()).toBeDefined();
    });
  });
});