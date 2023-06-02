import type { RedisClientOptions } from 'redis';
import { ConfigModule } from '@nestjs/config';
import { MongooseConnectionModule, TypeOrmConnectionModule } from './connection';
import { redisStore } from 'cache-manager-redis-store';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';

export const CoreModule = [
  MongooseConnectionModule,
  TypeOrmConnectionModule,
  CacheModule.registerAsync<RedisClientOptions>({
    useFactory: async () => ({
      store: (await redisStore({
        url: process.env.REDIS_URL,
      })) as unknown as CacheStore,
    }),
    isGlobal: true,
  }),
  ThrottlerModule.forRoot({
    ttl: 60,
    limit: 100,
  }),
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: ['.env.local'],
  }),
];
