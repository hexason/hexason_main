import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class UserAddress {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
