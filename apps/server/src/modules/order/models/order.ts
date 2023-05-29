import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Goods } from './goods';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  shortId: string;

  @Column()
  userId: string;

  @Column()
  username: string;

  @Column()
  address_city: string;

  @Column()
  address_district: string;

  @Column()
  address_street: string;

  @Column()
  address_info: string;

  @Column()
  contact_phone: string;

  @Column()
  contact_email: string;

  @Column()
  additional_info: string;

  @Column({ nullable: true })
  supplierId?: string;

  @Column({ nullable: true })
  supplier_info?: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  status: number;

  @Column({ type: 'numeric' })
  totalProductPrice: number;

  @Column({ type: 'numeric' })
  totalDeliveryPrice: number;

  @Column({ type: 'numeric' })
  totalPrice: number;

  @Column({ type: 'numeric' })
  paymentStatus: number;

  @Column()
  paidAt: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Goods, (type) => type.order)
  goods: Goods;
}
