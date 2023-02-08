import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.model';
import { User } from './user.model';

@Entity()
export class UserProduct {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @ManyToOne(() => Product, (product) => product.users)
  product: Product;

  @UpdateDateColumn()
  updatedAt: any;

  @CreateDateColumn()
  createdAt: any;
}
