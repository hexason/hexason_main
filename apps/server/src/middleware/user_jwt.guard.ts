import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UserJWTGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(UserService) private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (this.reflector.get('isPublic', context.getHandler()) === true)
      return true;

    try {
      const { authorization } = request.headers;
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.SUPABASE_SECRET) as any;
      const user = await this.userService.init(payload.sub);
      request.user = {
        ...user,
        sub: user.id,
      };
      return true;
    } catch (e) {
      return false;
    }
  }
}
