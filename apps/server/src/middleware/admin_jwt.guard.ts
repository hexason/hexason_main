import { SupabaseJWTPayload } from '@/lib/interfaces';
import { AdminService } from '@/service/admin.service';
import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AdminJWTGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(AdminService) private readonly adminService: AdminService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const { authorization } = request.headers;
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.SUPABASE_SECRET) as SupabaseJWTPayload;
      const admin = await this.adminService.getAdminByEmail({ email: payload.email });
      if (!admin) return false;
      request.user = {
        admin,
        ...payload
      };
      return true;
    } catch (e) {
      if (this.reflector.get('isPublic', context.getHandler()) === true)
        return true;
      return false;
    }
  }
}
