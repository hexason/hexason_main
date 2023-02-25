import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AdminJWTGuard {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    try {
      const { authorization } = request.headers;
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.SUPER_SECRET) as any;

      request.user = payload;
      return true;
    } catch (e) {
      if (this.reflector.get('isPublic', context.getHandler()) === true)
        return true;
      return false;
    }
  }
}
