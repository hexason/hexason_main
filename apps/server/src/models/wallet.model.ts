import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  mnemonic: string;

  @Column()
  xpub: string;

  @Column()
  address: string;

  @Column()
  network: string;

  @Column({
    type: 'decimal',
    default: 0,
  })
  balance: number;

  @Column()
  user_id: string;
}
