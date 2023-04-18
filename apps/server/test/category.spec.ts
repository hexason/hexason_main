import { AppModule } from '@/app.module';
import { CategoryService } from '@/service';
import { Test } from '@nestjs/testing';

describe('Category Service', () => {
  let service: CategoryService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get(CategoryService);
  });

  describe('createCategory', () => {
    it('should create category', async () => {
      return service
        .createCategory({
          name: 'other',
          description: 'hello',
          parent: '',
        })
        .then((res) => expect(res.name).toBe('other'))
        .catch((e) => expect(e.code).toBe('DUPLICABLE_DATA'));
    });
  });
});
