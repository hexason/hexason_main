import { Resolver, Query } from '@nestjs/graphql';
import { PaymentMethod } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver()
export class PaymentResolver {
  constructor(@InjectRepository(PaymentMethod) private readonly pmRepo: Repository<PaymentMethod>) {}

  @Query(() => [PaymentMethod])
  async getPaymentMethods() {
    const methods = await this.pmRepo.find({
      order: {
        method: 'ASC',
      },
    });

    return methods;
  }
}
