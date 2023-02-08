import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.model';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  session: string;

  @ManyToOne(() => User, (user) => user.sessions)
  user: User;

  @CreateDateColumn()
  created_at: Date;
}
