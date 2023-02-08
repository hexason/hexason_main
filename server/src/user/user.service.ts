import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { DataSource, Repository } from 'typeorm';
import { createClient, GoTrueAdminApi } from '@supabase/supabase-js';
import { Wallet } from '../models/wallet.model';
import { WalletService } from './wallet.service';
import { Transaction } from '../models/transaction.model';
import { HttpException } from '@nestjs/common';
import { Session } from '../models/session.model';

export class UserService {
  supaAdmin: GoTrueAdminApi;
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transRepository: Repository<Transaction>,
    @InjectRepository(Session)
    private readonly sessionRepo: Repository<Session>,
    private dataSource: DataSource,
    private readonly walletService: WalletService,
  ) {
    // this.userEarning(0.2)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );
    this.supaAdmin = supabase.auth.admin;
  }

  async userSession(id: string, session: string) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['wallet'],
    });
    if (!user) return false;

    user.session = session;
    const sessionRep = this.sessionRepo.create({
      user,
      session,
    });
    await this.sessionRepo.save(sessionRep).catch((e) => {
      console.log(e);
    });
    await this.userRepository.save(user);
    return user;
  }

  async referredGift(referCode: string) {
    const user = await this.userRepository.findOne({
      where: {
        refer: referCode,
      },
    });
    if (!user) return false;

    const wallet = await this.walletRepository.findOne({
      where: {
        user_id: user.id,
      },
    });
    if (!wallet) return false;

    await this.walletService.addBalance(user.id, 1, 'Gift from referral');
    return true;
  }

  async init(id: string, refer?: string) {
    const suser = await this.supaAdmin.getUserById(id);
    let user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['wallet', 'products', 'products.product'],
      select: {
        wallet: {
          address: true,
          balance: true,
          network: true,
        },
      },
    });
    if (user) return user;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const bWallet = await this.walletService.generateWalletMnemonic();
      let wallet = await this.walletRepository.findOne({
        where: {
          user_id: id,
        },
      });
      if (!wallet) {
        wallet = this.walletRepository.create({
          mnemonic: bWallet.mnemonic,
          xpub: bWallet.xpub,
          address: (await this.walletService.getPublicAddres(bWallet.xpub))
            .address,
          network: 'TRC20',
          user_id: id,
          balance: 1,
        });
        await queryRunner.manager.save(wallet);
      }

      user = this.userRepository.create({
        id: suser.data.user.id,
        email: suser.data.user.email,
        wallet,
        avatar_url: suser.data.user.user_metadata.avatar_url,
        full_name: suser.data.user.user_metadata.full_name,
        refer: Date.now().toString(36).slice(-6).toUpperCase(),
      });
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      if (refer) await this.referredGift(refer);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }

    delete user.wallet.user_id;
    delete user.wallet.id;
    delete user.wallet.mnemonic;
    delete user.wallet.xpub;
    return user;
  }

  async deposit(id: string) {
    const user = await this.init(id);
    const tronBalance = await this.walletService.getAcoountUSDTbalance(
      user.wallet.address,
    );
    const wallet = await this.walletRepository.findOne({
      where: {
        address: user.wallet.address,
      },
    });
    if (!wallet) return false;
    if (+tronBalance.slice(0, -6) < 10) return false;
    const transaction = this.transRepository.create({
      address: user.wallet.address,
      userId: user.id,
      amount: tronBalance.slice(0, -6),
      status: 'pending',
      type: 'deposit',
      message: '',
    });
    await this.walletService.transferTRX(user.wallet.address);

    await new Promise((resolve) => setTimeout(resolve, 10000));
    const txt = await this.walletService
      .transferTokenToMaster(wallet.mnemonic, tronBalance.slice(0, -6))
      .catch((e) => {
        console.log(e.response.data);
        throw new HttpException(e.response.data, 400);
      });
    if (!txt.txId) throw new HttpException('Transaction failed', 400);
    transaction.txId = txt.txId;
    console.log('Deposit ', txt.txId);
    await this.transRepository.save(transaction);

    return true;
  }

  async withdraw(id: string, address: string, amount: number) {
    const user = await this.init(id);
    const wallet = await this.walletRepository.findOne({
      where: {
        user_id: user.id,
      },
    });
    if (!wallet) throw new HttpException('Wallet not found', 400);
    if (amount < 10)
      throw new HttpException('Minimum withdraw amount is 10', 400);
    if (wallet.balance < amount)
      throw new HttpException('Insufficient balance', 400);

    const transaction = this.transRepository.create({
      address,
      userId: user.id,
      amount: (amount - 2).toString(),
      status: 'pending',
      type: 'withdraw',
      message: '',
    });
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const txt = await this.walletService
        .transferTokenToUser(address, (amount - 2).toString())
        .catch((e) => {
          console.log(e.response.data);
          throw new HttpException(e.response.data, 400);
        });
      if (!txt.txId) throw new HttpException('Transaction failed', 400);
      transaction.txId = txt.txId;
      wallet.balance -= amount;

      await queryRunner.manager.save(transaction);
      await queryRunner.manager.save(wallet);
      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      throw err;
    }
  }

  async status(id: string) {
    const earningDataSet = await this.dataSource
      .createQueryBuilder('transaction', 't')
      .select('"created_at"::date::text, sum(CAST(amount as decimal)) as value')
      .where("t.userId = :id AND t.type='earn' AND t.status='success'", { id })
      .orderBy('created_at', 'DESC')
      .groupBy('"created_at"::date::text')
      .limit(7)
      .getRawMany();
    const HashMappedEarning = earningDataSet.reduce((acc, cur) => {
      const key = new Date(cur.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
      console.log(key);
      acc[key] = cur.value;
      return acc;
    }, {});

    const lastSevenDays: { date: string; value: number }[] = new Array(7)
      .fill(0)
      .map((_, i) => `2021-01-${i + 1}`)
      .map((date) => {
        const d = new Date(
          Date.now() - 86400000 * 7 + 86400000 * new Date(date).getDay(),
        );
        const month = d.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        });
        return {
          date: month,
          value: +HashMappedEarning[month] || 0,
        };
      });
    const totalEarning = await this.dataSource
      .createQueryBuilder('transaction', 't')
      .select('sum(CAST(amount as decimal)) as value')
      .where("t.userId = :id AND t.type='earn' AND t.status='success'", { id })
      .getRawOne();

    return { lastSevenDays, totalEarning: totalEarning.value || 0 };
  }

  isProcessing = false;
  async userCheckDeposit() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    const recursive = async (users: any[]) => {
      if (users.length < 1) return;
      const user = users.pop();
      await this.deposit(user.id);
      await recursive(users).catch((e) => {
        console.log(e.response);
      });
    };

    const users = await this.userRepository.find({
      relations: ['wallet'],
    });

    console.log('Checking users deposit');
    await recursive(users);
    console.log('Done Users check deposit');
    this.isProcessing = false;
  }

  async userEarning(profitX: number) {
    const userProduct = await this.dataSource
      .createQueryBuilder('user_product', 'up')
      // join product and user
      .leftJoinAndSelect('up.product', 'product')
      .leftJoinAndSelect('up.user', 'user')
      .getMany();

    const recursive = async (userProds: any[]) => {
      if (userProds.length < 1) return;
      const userProd = userProds.pop();
      const wallet = await this.walletRepository.findOne({
        where: {
          user_id: userProd.user.id,
        },
      });
      const queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        wallet.balance = +(
          +wallet.balance +
          +userProd.product.price * profitX
        ).toFixed(3);
        const transaction = this.transRepository.create({
          address: wallet.address,
          userId: userProd.user.id,
          amount: (+userProd.product.price * profitX).toString(),
          status: 'success',
          type: 'earn',
          message: 'Daily',
        });
        await queryRunner.manager.save(wallet);
        await queryRunner.manager.save(transaction);
        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
      await recursive(userProds);
    };
    recursive(userProduct);
  }
}
