import { InjectDataSource } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { DataSource, In, Repository } from 'typeorm';
import { Admin, Permission, Role, SupplierAdmin } from './models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  adminRepo: Repository<Admin>;
  roleRepo: Repository<Role>;
  permissionRepo: Repository<Permission>;
  supplierAdminRepo: Repository<SupplierAdmin>;

  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.roleRepo = this.dataSource.getRepository(Role);
    this.adminRepo = this.dataSource.getRepository(Admin);
    this.permissionRepo = this.dataSource.getRepository(Permission);
    this.supplierAdminRepo = this.dataSource.getRepository(SupplierAdmin);
  }

  async getAdminByEmail({ email }) {
    const admin = await this.adminRepo.findOne({
      where: {
        email,
      },
      relations: ['supplier', 'supplier.role', 'supplier.role.permissions'],
    });
    if (!admin) throw { code: 'NOT_FOUND_DATA', message: 'Admin not found' };
    return admin;
  }

  async getAllPermissionsBy(roleId: string | string[]) {
    const permissions = await this.permissionRepo.findBy({
      role: In(Array.isArray(roleId) ? roleId : [roleId]),
    });
    return permissions;
  }

  permissionChecker(permissions: { key: string; code: number }[], rule: { key: string; code: number }) {
    const check = permissions.find((permission) => permission.key === rule.key);
    if (!check) throw { code: 'RULE_PERMITION', message: "can't accept" };
    if (check.code < rule.code) throw { code: 'RULE_PERMITION', message: "can't accept" };
  }

  async roleAdd(name: string) {
    const role = this.roleRepo.create({
      name,
    });
    await this.roleRepo.save(role);
    return await this.roleRepo.findOne({
      where: { id: role.id },
      relations: ['permissions'],
    });
  }

  async permissionAdd({ roleId, key, code }: any) {
    const role = await this.roleRepo.findOneBy({ id: roleId });
    if (!role) throw { code: 'NOT_FOUND_DATA', message: "Role doesn't exist" };

    const permission = this.permissionRepo.create({
      key,
      code,
      role,
    });
    await this.permissionRepo.save(permission);
    return await this.roleRepo.findOne({
      where: { id: roleId },
      relations: ['permissions'],
    });
  }

  tokenGenerator({ email }) {
    const access_token = sign({ email }, process.env.SUPABASE_SECRET || '', {
      expiresIn: '1d',
    });
    return access_token;
  }
}
