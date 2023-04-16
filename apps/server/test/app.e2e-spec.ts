import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AdminService } from '@/service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let adminService: AdminService

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    adminService = moduleFixture.get(AdminService);
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/product/:id/info', () => {
    const token = adminService.tokenGenerator({ email: "nikorunikk@gmail.com" });
    const title = "test"
    return request(app.getHttpServer())
      .put('/product/64365283ac96be2f5f119c95/info')
      .send({
        title,
        description: "test e2e",
        bgColor: '#000',
        brand: "Supertest",
        image: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg",
        images: [
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
          { url: "https://www.nursafia.my/image/nursafia/image/data/all_product_images/product-1482/test-product-copy_1655771197.jpeg" },
        ],
        category: ["643652045afd39516f042376"],
        options: [{ configName: "color", value: "red" }]
      })
      .set("authorization", "Bearer " + token)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(JSON.parse(response.text).title).toBe(title)
      })
  });

  it('/product/:id/item', () => {
    const token = adminService.tokenGenerator({ email: "nikorunikk@gmail.com" });
    const title = "test"
    return request(app.getHttpServer())
      .put('/product/64365283ac96be2f5f119c95/item')
      .send({
        configName: title,
        altTxt: 'test',
        image: '',
        status: 12,
        sku: Date.now().toString(32),
        upc: '1234',
        price: 1000,
        stock: 10,
      }).set("authorization", "Bearer " + token)
      .set('Accept', 'application/json')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        expect(JSON.parse(response.text).configName).toBe(title)
      })
  })
});
