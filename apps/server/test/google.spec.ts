import { AppModule } from '@/app.module';
import { GoogleService } from '@/service';
import { Test } from '@nestjs/testing';

describe('GoogleService', () => {
  let service: GoogleService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = moduleRef.get<GoogleService>(GoogleService);
  }, 30000);

  describe('Test it', () => {
    it('GoogleTranslate', async () => {
      expect(await service.translate('Сайн уу?', 'en')).toBeDefined();
    });
  });
});
