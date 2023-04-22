import { AdminJWTGuard } from '@/middleware/admin_jwt.guard';
import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth() {
  return applyDecorators(
    UseGuards(AdminJWTGuard),
    ApiBearerAuth('admin-access'),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );
}
