import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Backpack, BackpackSchema } from './models';
import { BasketService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Backpack.name,
        schema: BackpackSchema,
      },
    ]),
  ],
  providers: [BasketService],
})
export class UserModule {}
