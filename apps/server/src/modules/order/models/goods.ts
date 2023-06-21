import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';
import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType()
@Entity()
export class Goods {
  @Field(() => ID)
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Field(() => Order)
  @ManyToOne(() => Order)
  order: Order;

  @Field()
  @Column()
  productId: string;

  @Field()
  @Column()
  productImage: string;

  @Field()
  @Column()
  SKU: string;

  @Field()
  @Column()
  productTitle: string;

  @Field()
  @Column()
  productPrice: number;

  @Field()
  @Column()
  productQuantity: number;

  @Field()
  @Column({ type: 'text', default: '[]' })
  productDetail: string; //JSON data will here

  @Field({ nullable: true })
  @Column({ nullable: true })
  productUrl: string;

  @Field(() => Number)
  @Column()
  totalPrice: number;

  @Field()
  @Column()
  status: number; // 0 - pending, 1 - verified, 2 - ordered, 3 - on delivery, 4 - Arrived, 5 - Delivered, 10 - closed, 20 - cancel
}
