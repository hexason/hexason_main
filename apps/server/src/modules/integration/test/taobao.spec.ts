import { Test } from '@nestjs/testing';
import { TaobaoService } from '../services/taobao.service';
import { IntegrationModule } from '../integration.module';
import { CoreModule } from '@/config';

describe('Taobao Tester', () => {
  let service: TaobaoService;
  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [...CoreModule, IntegrationModule],
    });
    service = (await moduleRef.compile()).get('TAOBAO_INTEGRAION');
  });

  describe('OtApi Fetch run', () => {
    it('must defined', async () => {
      const data = await service.getItemByTaoId('684756959028');
      console.log(data);
      expect(data).toBeDefined();
    });
  });
});
