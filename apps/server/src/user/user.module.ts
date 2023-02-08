import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';

import { UserService } from './user.service';
import { WalletService } from './wallet.service';

import { Wallet } from '../models/wallet.model';
import { User } from '../models/user.model';
import { Transaction } from '../models/transaction.model';
import { UserProduct } from '../models/userProduct.model';
import { Session } from '../models/session.model';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wallet, Transaction, UserProduct, Session]),
  ],
  controllers: [UserController],
  providers: [UserService, WalletService],
  exports: [UserService, WalletService, TypeOrmModule],
})
export class UserModule {}
