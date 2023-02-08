import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello(): string {
    return 'Working Well!';
  }

  @Get("init")
  appInit() {
    return {
      title: "NestJS App",
      logo: "https://scontent.fuln6-1.fna.fbcdn.net/v/t1.15752-9/328444234_570879658002243_7714778304736542193_n.png?_nc_cat=107&ccb=1-7&_nc_sid=ae9488&_nc_ohc=nUpIJqX5JusAX_6nwl3&tn=jOOilTIRcru4CZx1&_nc_ht=scontent.fuln6-1.fna&oh=03_AdRI9Qy4ZVr52ed3NemB5agmQNtBkcLnQFeoUJajeM2p_A&oe=640B362F",
      description: "NestJS is a progressive Node.js framework for building efficient, reliable and scalable server-side applications."
    };
  }
}
