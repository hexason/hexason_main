import {
  Column,
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

  @Column()
  shortCode: string;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column({ default: 'inbasket', enum: ['inbasket', 'pending', 'paid', 'prepare', 'shipping', 'delivered', 'closed', 'cancel', 'done'] })
  status: string;

  @Column({nullable: true})
  paymentRef: string;

  @Column({nullable: true})
  paymentStatus: string;

  @Column({nullable: true})
  paymentMessage: string;

  @Column({nullable: true})
  paymentDate: Date;

  @UpdateDateColumn()
  updatedAt: any;

  @CreateDateColumn()
  createdAt: any;
}
