import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Working Well!';
  }

  @Get('init')
  appInit() {
    return {
      title: 'Hexason',
      logo: null,
      description:
        'NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications.',
    };
  }
}
