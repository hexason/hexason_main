import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Transaction } from '../models/transaction.model';
import { DataSource, Repository } from 'typeorm';
import { Wallet } from '../models/wallet.model';

const feeLimit = 20;
export class WalletService {
  axios = async (url: string, method: string, body?: any) => {
    return axios({
      method,
      url,
      data: body,
    })
      .then((res) => res.data)
      .catch((e) => {
        if (!e.response) {
          e.response = {
            data: 'Service connection lost',
            status: 500,
          };
          this.logger.error('No Response: https://api.tatum.io/v3');
        }
        throw e;
      });
  };
  logger = new Logger('WalletService');
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(Transaction)
    private readonly transRepository: Repository<Transaction>,
    private readonly dataSource: DataSource,
  ) {
    axios.defaults.baseURL = 'https://api.tatum.io/v3';
    axios.defaults.headers.common['x-api-key'] = process.env.TATUM_API_KEY;
  }

  async addBalance(user_id: string, amount: number, description?: string) {
    const wallet = await this.walletRepository.findOne({
      where: {
        user_id,
      },
    });
    if (!wallet) return false;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Wallet, wallet.id, {
        balance: +(+wallet.balance + amount).toFixed(2),
      });
      await queryRunner.manager.insert('transaction', {
        address: wallet.address,
        amount,
        userId: wallet.user_id,
        type: 'earn',
        status: 'success',
        message: description || 'Deposit',
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

  async balanceDecrease(wallet: Wallet, amount: string, description?: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(Wallet, wallet.id, {
        balance: wallet.balance - +amount,
      });
      await queryRunner.manager.insert('transaction', {
        address: wallet.address,
        amount,
        userId: wallet.user_id,
        type: 'transfer',
        status: 'success',
        message: description || 'Fee for transfer',
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

  generateWalletMnemonic() {
    return this.axios('/tron/wallet', 'GET') as Promise<{
      mnemonic: string;
      xpub: string;
    }>;
  }

  getPublicAddres(xpub: string) {
    return this.axios(`/tron/address/${xpub}/0`, 'GET') as Promise<{
      address: string;
    }>;
  }

  async transferTokenToMaster(mnemonic: string, amount: string) {
    const { key } = await this.axios('tron/wallet/priv', 'POST', {
      index: 0,
      mnemonic,
    });
    return this.axios('/tron/trc20/transaction', 'POST', {
      fromPrivateKey: key,
      to: 'TXMFt8UXdTfwuWPAYSzkG1ThLNQ9ouQmdv',
      tokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      feeLimit,
      amount,
    });
  }

  async getAccountBalance(address: string) {
    return this.axios('/tron/account/' + address, 'GET') as Promise<{
      address: string;
      balance: number;
      trc20: {
        [x: string]: string;
      }[];
    }>;
  }

  async getAcoountUSDTbalance(address: string) {
    const balance = await this.getAccountBalance(address)
      .then((data) => {
        if (!data.trc20[0]) return '0';
        if (data.trc20[0]['TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'])
          return data.trc20[0]['TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t'];
        else return '0';
      })
      .catch((e) => {
        if (
          e.response &&
          e.response.data.errorCode === 'tron.account.not.found'
        )
          this.transferTRX(address, '1').catch((e) => {
            if (e.response) this.logger.error(e.response.data);
            else this.logger.error(e);
          });
        else {
          this.logger.error(e.message);
        }
        return '0';
      });
    return balance;
  }

  async transferTRX(address: string, amount?: string) {
    return this.axios('/tron/transaction', 'POST', {
      fromPrivateKey: process.env.TRON_MASTER_PRIVATE_KEY,
      to: address,
      amount: amount || feeLimit.toString(),
    });
  }

  async transferTokenToUser(address: string, amount: string) {
    return this.axios('/tron/trc20/transaction', 'POST', {
      fromPrivateKey: process.env.TRON_MASTER_PRIVATE_KEY,
      to: address,
      tokenAddress: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      feeLimit,
      amount,
    });
  }

  async transferTRXtoMaster(mnemonic: string, xpub: string) {
    const { key } = await this.axios('tron/wallet/priv', 'POST', {
      index: 0,
      mnemonic,
    });
    const { address } = await this.getPublicAddres(xpub);
    const { balance } = await this.getAccountBalance(address);
    console.log(balance);
    if (balance < 10) {
      console.log('skipped');
      return;
    }
    return this.axios('/tron/transaction', 'POST', {
      fromPrivateKey: key,
      to: 'TXMFt8UXdTfwuWPAYSzkG1ThLNQ9ouQmdv',
      amount: balance.toString().slice(0, -6),
    });
  }

  async masterCombineTRX() {
    const wallets = await this.walletRepository.find({});
    const recursive = async () => {
      const wallet = wallets.pop();
      if (!wallet) return;
      await this.transferTRXtoMaster(wallet.mnemonic, wallet.xpub).catch(
        (e) => {
          if (e.response) this.logger.error(e.response.data.errorCode);
          else this.logger.error(e);
        },
      );
      // await new Promise(r => setTimeout(r, 1000 * 60));
      await recursive();
    };
    await recursive();
  }

  isProcessing = false;
  async depositUSDT() {
    const queue = await this.transRepository.find({
      where: {
        status: 'pending',
        type: 'deposit',
      },
    });

    const recursive = async () => {
      if (queue.length === 0) {
        this.isProcessing = false;
        return;
      }
      const { id, amount, txId, userId } = queue.shift();
      const txt = await this.axios('/tron/transaction/' + txId, 'GET').catch(
        (e) => {
          if (e.response) this.logger.error(e.response.data.errorCode);
          else this.logger.error(e);
          return { ret: [] };
        },
      );
      if (txt.ret[0].contractRet === 'SUCCESS') {
        await this.transRepository.update(id, {
          status: 'success',
        });
        await this.walletRepository.update(
          { user_id: userId },
          {
            balance: () => `balance + ${amount}`,
          },
        );
      }
      await recursive();
    };
    if (!this.isProcessing) {
      this.logger.warn('Processing deposit');
      this.isProcessing = true;
      await recursive();
      this.logger.warn('Processing deposit done');
    }
  }
}
