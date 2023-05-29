import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order';

@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  cargoName: string;

  @Column()
  recivedAt: string;

  @Column()
  shippedAt: string;

  @Column()
  status: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  detailLink: string;

  @ManyToOne(() => Order)
  order: Order;
}
