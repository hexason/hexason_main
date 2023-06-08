import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Goods } from './goods';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Order {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  shortId: string;

  @Field()
  @Column()
  userId: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  address_city: string;

  @Field()
  @Column()
  address_district: string;

  @Field()
  @Column()
  address_street: string;

  @Field()
  @Column()
  address_info: string;

  @Field()
  @Column()
  contact_phone: string;

  @Field()
  @Column()
  contact_email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  additional_info?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field()
  @Column()
  status: number; // 0 - pending, 1 - verified, 2 - ordered, 3 -on delivery, 4 - Arrived, 5 - delivered, 10 - closed, 20 - cancel

  @Field()
  @Column({ type: 'numeric' })
  totalProductPrice: number;

  @Field()
  @Column({ type: 'numeric' })
  totalDeliveryPrice: number;

  @Field()
  @Column({ type: 'numeric' })
  totalPrice: number;

  @Field()
  @Column()
  paymentStatus: number; // 0 - checking, 1 - pending, 2 - paid, 20 - cancel

  @Field(() => String, { nullable: true })
  @Column({ type: 'varchar', nullable: true })
  paidAt?: string | null;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;

  @Field(() => [Goods])
  @OneToMany(() => Goods, (type) => type.order, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  goods: Goods[];
}
