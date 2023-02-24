import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { controllers } from './controller/inext';
import { HealthController } from './health.controller';
import { UserService } from './service/user.service';
import { OrderService } from './service/order.service';
import { AppService } from './service/app.service';
import * as entities from "./models"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT || 5432),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: process.env.DB_SYNC === 'true',
        entities: Object.values(entities),
        seeds: [__dirname + '/models/seeder/*.seeder{.ts,.js}'],
        factories: [__dirname + '/models/factory/*.factory{.ts,.js}'],
      }),
    }),
    TerminusModule,
  ],
  providers: [UserService, OrderService, AppService],
  controllers: [AppController, HealthController, ...controllers],
})
export class AppModule {}
