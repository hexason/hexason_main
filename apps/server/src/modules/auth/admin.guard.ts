import { SupabaseJWTPayload } from 'pointes';
import { CanActivate, ExecutionContext, HttpException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { AdminService } from './admin.service';

@Injectable()
export class AdminJWTGuard implements CanActivate {
  constructor(private reflector: Reflector, @Inject(AdminService) private readonly adminService: AdminService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const { authorization, supplier_id } = request.headers;
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.SUPABASE_SECRET || '') as SupabaseJWTPayload;
      const admin = await this.adminService.getAdminByEmail({
        email: payload.email,
      });
      if (!admin) throw new Error('admin not found');
      if (admin.supplier.length === 0 && admin.role !== 'super') throw new Error('No registered supply');
      if (supplier_id && admin.supplier.find((el) => el.supplierId === supplier_id))
        throw new Error('Supplier permission');

      const permissions = await this.adminService.getAllPermissionsBy(admin.supplier.map((el: any) => el.role.id));
      const rule = this.reflector.get('rule', context.getHandler()) as {
        key: string;
        code: number;
      } | null;
      if (rule) this.adminService.permissionChecker(permissions, rule);

      request.user = {
        admin,
        permissions,
        supplier_id: supplier_id || admin.supplier[0].supplierId,
        ...payload,
      };
      return true;
    } catch (e) {
      if (this.reflector.get('isPublic', context.getHandler()) === true) return true;
      if (e.code === 'RULE_PERMITION') throw new HttpException(e, 401);
      return false;
    }
  }
}
