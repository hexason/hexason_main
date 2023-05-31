import { Global, Module } from '@nestjs/common';
import { TaobaoService } from './services/taobao.service';

@Global()
@Module({
  providers: [
    {
      provide: 'TAOBAO_INTEGRAION',
      useClass: TaobaoService,
    },
  ],
  exports: [{ provide: 'TAOBAO_INTEGRAION', useClass: TaobaoService }],
})
export class IntegrationModule {}
