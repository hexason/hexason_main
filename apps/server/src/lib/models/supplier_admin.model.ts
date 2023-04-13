import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Admin } from "./admin.model";
import { Role } from "./role.model";

@Entity()
export class SupplierAdmin {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  supplierId: string;

  @OneToOne(() => Role)
  @JoinColumn()
  role: Role | string;

  @ManyToOne(() => Admin)
  admin: string;
}