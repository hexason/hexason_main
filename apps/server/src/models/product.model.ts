import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserProduct } from './userProduct.model';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  salePrice: number;

  @Column()
  sold: number;

  @Column()
  image: string;

  @Column()
  status: string;

  @OneToMany(() => UserProduct, (user) => user.product)
  users: UserProduct;

  @CreateDateColumn()
  createdAt: Date;
}
