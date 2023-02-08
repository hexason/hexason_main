import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { UserProduct } from './userProduct.model';
import { Wallet } from './wallet.model';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  avatar_url: string;

  @Column({ nullable: true })
  session: string;

  @Column({ nullable: true, default: '' })
  profileLvl: string;

  @Column({ nullable: true, default: '' })
  refer: string;

  @OneToOne(() => Wallet)
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => UserProduct, (product) => product.user)
  products: UserProduct;

  @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
}
