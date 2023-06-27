import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from '../models';
import { Repository } from 'typeorm';
import { AddressInputQL } from '../gql/AddressQL';

export class AddressService {
  constructor(@InjectRepository(UserAddress) private readonly uaRepo: Repository<UserAddress>) {}

  async getAllAddress(userId: string) {
    const userAddress = await this.uaRepo.find({
      where: {
        userId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return userAddress;
  }

  async createAddress(userId: string, data: AddressInputQL) {
    const address = this.uaRepo.create({
      userId,
      username: data.username,
      address_city: data.address_city,
      address_district: data.address_district,
      address_street: data.address_street,
      address_info: data.address_info,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
    });
    await this.uaRepo.save(address);

    return address;
  }

  async updateAddress(id: string, data: AddressInputQL) {
    const address = await this.uaRepo.findOneBy({ id });
    if (!address) return null;

    Object.keys(data).forEach((keyValue) => {
      address[keyValue] = data[keyValue];
    });
    await this.uaRepo.save(address);

    return address;
  }
}
