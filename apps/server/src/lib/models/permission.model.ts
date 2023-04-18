import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.model';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  key: string;

  @Column({ enum: [400, 600] })
  code: number; // 400-read, 600-read,write

  @ManyToOne(() => Role)
  role: any;
}
