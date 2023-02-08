import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Game {
  @PrimaryColumn()
  id: string;

  @Column()
  pgn: string;

  @Column()
  w: string;

  @Column()
  b: string;

  @Column({ nullable: true })
  winner: string;

  @Column()
  status: string;

  @Column({ default: 1, type: 'decimal' })
  bet: number;

  @CreateDateColumn()
  created_at: Date;
}
