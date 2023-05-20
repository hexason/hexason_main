import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Order)
  order: Order;

  @Column()
  productId: string;

  @Column()
  productTitle: string;

  @Column()
  productPrice: number;

  @Column()
  productQuantity: number;

  @Column()
  productDetail: string;

  @Column()
  productUrl: string;

  @Column()
  totalPrice: string;

  @Column()
  status: number;
}
