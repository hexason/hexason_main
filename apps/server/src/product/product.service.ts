import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Product } from '../models/product.model';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from '../models/user.model';
import { Wallet } from '../models/wallet.model';
import { UserProduct } from '../models/userProduct.model';
import { User } from '../models/user.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(UserProduct)
    private readonly userProductRepo: Repository<UserProduct>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private dataSource: DataSource,
  ) {}

  findAll() {
    return this.productRepository.find({
      where: { status: 'active' },
      order: { createdAt: 'DESC' },
    });
  }

  findById(id: string) {
    return this.productRepository.findOne({ where: { id } });
  }

  async buyProduct(id: string, userId: string) {
    console.log(userId);
    const wallet = await this.walletRepository.findOne({
      where: {
        user_id: userId,
      },
    });
    if (!wallet) throw new Error('Not found wallet');

    const user = await this.UserRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new Error('Not found user');

    const product = await this.productRepository.findOne({
      where: {
        id,
        status: 'active',
      },
    });
    if (!product) throw new Error('Not found product');

    const userProduct = await this.userProductRepo.count({
      where: {
        product,
        user,
      },
    });

    if (userProduct > 0 && id === '3b6b37b5-6164-461b-8f9f-c41d73df0be3')
      throw new Error('You have already bought this product');
    if (userProduct > 2)
      throw new Error('You bought so many. Only 3 products are allowed');
    if (product.price > wallet.balance) throw new Error('insufficient balance');

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Wallet, wallet.id, {
        balance: wallet.balance - product.price,
      });
      await queryRunner.manager.update(Product, product.id, {
        sold: product.sold + 1,
      });
      await queryRunner.manager.insert('user_product', {
        user: userId,
        product: product.id,
      });
      await queryRunner.manager.insert('transaction', {
        address: wallet.address,
        amount: product.price,
        userId,
        type: 'transfer',
        status: 'success',
        message: 'Buy product ' + product.title,
      });

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
