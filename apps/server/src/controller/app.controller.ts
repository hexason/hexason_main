import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return 'Working Well!';
  }

  @Get('init')
  async appInit() {
    const app = await this.appService.initApp();
    return {
      title: app['config.info']['app.title'],
      logo: app['config.info']['app.logo'],
      description: app['config.info']['app.description'],
      colors: app['config.color'],
    };
  }

  @Get('info/bank')
  async bankAccount() {
    const app = await this.appService.initApp();

    return (
      app['config.bank'] || {
        'bank.name': 'not_cofigured',
        'bank.account': 'not_configured',
        'bank.reciver': 'not_configured',
      }
    );
  }
}
