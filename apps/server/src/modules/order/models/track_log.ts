import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Track } from './track';

@Entity()
export class TrackLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Track)
  track: string;

  @Column()
  description: string;

  @Column()
  action: string;

  @CreateDateColumn()
  createdAt: string;
}
