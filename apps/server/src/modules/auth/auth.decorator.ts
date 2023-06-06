import { AdminJWTGuard } from './admin.guard';
import { ExecutionContext, UseGuards, applyDecorators, createParamDecorator } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CustomerJWTGuard } from './customer.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

export function Auth() {
  return applyDecorators(
    UseGuards(AdminJWTGuard),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export function CustomerAuth() {
  return applyDecorators(
    UseGuards(CustomerJWTGuard),
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}

export const CurrentUserGQL = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  return ctx.getContext().req.user;
});
