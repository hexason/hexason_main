import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';

export const MongooseConnectionModule = MongooseModule.forRootAsync({
  useFactory: async () => ({
    uri: process.env.MONGO_URL,
  }),
});

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
