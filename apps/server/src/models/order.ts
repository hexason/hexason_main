import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "./order_item";
import { User } from "./user.model";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: string

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

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem;

  @ManyToOne(() => User, (user) => user.orders)
  user: User

  @Column({ nullable: true })
  paymentRef: string;

  @Column({ default: "waiting", enum: ["waiting", "bank", "cash"] })
  paymentStatus: string;

  @Column({ default: "" })
  paymentMessage: string;

  @Column({ nullable: true })
  paymentDate: Date;

  @UpdateDateColumn()
  updatedAt: any;

  @CreateDateColumn()
  createdAt: any;
}