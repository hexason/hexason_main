import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as controller from '@/controller';

import * as entities from '@/lib/models/index';
import { SchemaFormats } from "@/lib/schema/index"
import * as services from '@/service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local'],
    }),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: process.env.MONGO_URL
      }),
      inject: [ConfigService]
    }),
    MongooseModule.forFeature(SchemaFormats),
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
  providers: Object.values(services),
  controllers: Object.values(controller),
})
export class AppModule { }
