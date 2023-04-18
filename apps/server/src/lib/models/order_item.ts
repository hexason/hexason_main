import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from './order';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ nullable: true })
  product: string;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;

  @Column()
  quantity: number;

  @Column()
  totalPrice: number;

  @Column({
    default: 'pending',
    enum: [
      'inbasket',
      'pending',
      'paid',
      'prepare',
      'shipping',
      'delivered',
      'closed',
      'cancel',
      'done',
    ],
  })
  status: string;

  @UpdateDateColumn()
  updatedAt: any;

  @CreateDateColumn()
  createdAt: any;
}
