import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Admin } from './admin.model';
import { Role } from './role.model';

@Entity()
export class SupplierAdmin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  supplierId: string;

  @ManyToOne(() => Role)
  @JoinColumn()
  role: Role | string;

  @ManyToOne(() => Admin)
  admin: Admin | string;
}
