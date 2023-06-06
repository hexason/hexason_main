import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

// In-Memory DB connection
export const CacheModuleConnection = CacheModule.registerAsync<RedisClientOptions>({
  useFactory: async () => ({
    store: (await redisStore({
      url: process.env.REDIS_URL,
    })) as unknown as CacheStore,
  }),
  isGlobal: true,
});

// MongoDB connection
export const MongooseConnectionModule = MongooseModule.forRootAsync({
  useFactory: async () => ({
    uri: process.env.MONGO_URL,
  }),
});

// Postgres connection
export const TypeOrmConnectionModule = TypeOrmModule.forRootAsync({
  useFactory: () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC === 'true',
  }),
});
