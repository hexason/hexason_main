import { Test } from '@nestjs/testing';
import { ShopModule } from '../shop.module';
import { AuthModule } from '@/modules/auth';
import { ProductService } from '../services';
import { MongooseConnectionModule, TypeOrmConnectionModule } from '@/core/connection';
import { ConfigModule } from '@nestjs/config';

describe('Product Tester', () => {
  let service: ProductService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [
        ShopModule,
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: ['.env.local'],
        }),
        MongooseConnectionModule,
        TypeOrmConnectionModule,
      ],
    });

    service = (await moduleRef.compile()).get(ProductService);
  });

  describe('Product Run', () => {
    it('must defined', () => {
      expect(service).toBeDefined();
    });
  });
});
