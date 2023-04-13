import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.model";

@Entity()
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[]
}