import { Test } from '@nestjs/testing';
import { AddressService } from '../services/Address.service';
import { OrderModule } from '../order.module';
import { CoreModule } from '@/config';
import { ShopModule } from '@/modules/shop/shop.module';
import { AuthModule } from '@/modules/auth';

describe('Address testing', () => {
  let service: AddressService;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ShopModule, AuthModule, OrderModule, ...CoreModule],
    }).compile();
    service = module.get(AddressService);
  });

  describe('Address creating', () => {
    it('should be defined', async () => {
      const address = await service.createAddress('123', {
        username: 'john_doe',
        address_city: 'New York',
        address_district: 'Manhattan',
        address_street: '123 Main Street',
        address_info: 'Apartment 4B',
        contact_phone: '555-1234',
        contact_email: 'john@example.com',
      });
      console.log(address);
      expect(address).toBeDefined();
    });
  });
  describe('Address creating', () => {
    it('should be defined', async () => {
      const address = await service.updateAddress('cbc132a5-f952-4768-ae36-50598400405b', {
        username: 'john_doe',
        address_city: 'New York',
        address_district: 'Khan-UUl',
        address_street: '123 Main Street',
        address_info: 'Apartment 4B',
        contact_phone: '555-1234',
        contact_email: 'john@example.com',
      });
      console.log(address);
      expect(address).toBeDefined();
    });
  });
});
