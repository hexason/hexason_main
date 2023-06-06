import { ConfigModule } from '@nestjs/config';
import { CacheModuleConnection, MongooseConnectionModule, TypeOrmConnectionModule } from './connection';
import { ThrottlerModule } from '@nestjs/throttler';

export const CoreModule = [
  MongooseConnectionModule,
  TypeOrmConnectionModule,
  CacheModuleConnection,
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 100,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local'],
  }),
];
