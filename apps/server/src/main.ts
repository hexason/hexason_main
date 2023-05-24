import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { IoCustomAdapter } from './utils/io-adapter';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

  app.useWebSocketAdapter(new IoCustomAdapter(app));
  app.useGlobalPipes(new ValidationPipe());
  if (process.env.SWAGGER === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Api Documentation')
      .setDescription('The cats API description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
        },
        'access-token',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }

  console.log(process.env.APP_NAME);

  await app.listen(4000, '0.0.0.0');
}
bootstrap();
