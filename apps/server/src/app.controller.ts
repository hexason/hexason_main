import { Controller, Get } from '@nestjs/common';
@Controller()
export class AppController {
  constructor() { }

  @Get()
  getHello(): string {
    return 'Working Well!';
  }

  @Get('init')
  appInit() {
    return {
      title: process.env.APP_NAME,
      logo: null,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec aliquam aliquam, nunc nisl aliquam massa, eget aliquam ni',
    };
  }
}
