import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupplierAdmin } from './supplier_admin.model';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  credential: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(() => SupplierAdmin, (supplier) => supplier.admin)
  supplier: SupplierAdmin[];
}
