import { AppModule } from '@/app.module';
import { ProductService } from '@/service';
import { Test } from '@nestjs/testing';

describe('Product Service', () => {
  let productService: ProductService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    productService = moduleRef.get<ProductService>(ProductService);
  });

  describe('getProducts', () => {
    it('should return an array of product', async () => {
      const products = await productService.getProducts();
      expect(products).toBeDefined();
    });
  });

  describe('createProduct', () => {
    it('should return an product', async () => {
      try {
        const res = await productService.createProduct({
          "title": "Hokage T5A",
          "description": "Hokage T5A\nRTX3060 I7-11 gen",
          "brand": "Firebat",
          "image": "http://file.firebat.com.cn/FtGLwoPAAjEhy9IB43xcSdVxi6bE",
          "price": 4400000,
          discount: 0,
          "sold": 0,
          "quantity": 0,
          supplier: "64364d4829aeda71de8a6fa6",
          category: "643652045afd39516f042376",
          options: [],
          images: [],
          bgColor: "",
          items: [],
          "status": "active",
        });
        return expect(res.title).toBe("Hokage T5A");
      } catch (e) {
        return expect(e.code).toBe("FORMAT");
      }
    })
  })
});