import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  address: string;

  @Column()
  userId: string;

  @Column()
  amount: string;

  @Column()
  type: 'deposit' | 'withdraw' | 'transfer' | 'earn';

  @Column()
  status: 'pending' | 'failed' | 'success';

  @Column({ nullable: true })
  message?: string;

  @Column({ nullable: true })
  txId?: string;

  @CreateDateColumn()
  created_at: Date; // Creation date

  @UpdateDateColumn()
  updated_at: Date; // Last updated date
}
