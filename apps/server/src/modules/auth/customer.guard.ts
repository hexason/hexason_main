import { SupabaseJWTPayload } from 'pointes';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class CustomerJWTGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    try {
      const { authorization } = request.headers;
      const token = authorization.split(' ')[1];
      const payload = verify(token, process.env.SUPABASE_SECRET || '') as SupabaseJWTPayload;
      if (!payload || !payload.sub) throw new Error('Unauthorized');
      request.user = payload;
      return true;
    } catch (e) {
      request.user = {
        sub: 'unknown',
      };
      return true;
    }
  }
}
