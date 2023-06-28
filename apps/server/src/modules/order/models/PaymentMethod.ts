import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class PaymentMethod {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  method: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bank_name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bank_account: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  bank_reciver: string;
}
