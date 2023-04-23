import { AccessJWTGuard } from './jwt-strategy.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    UseGuards(AccessJWTGuard),
    ApiBearerAuth('admin-access'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
