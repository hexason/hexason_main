import { AdminJWTGuard } from '@/middleware/admin_jwt.guard';
import { Controller, UseGuards, Request, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Get('me')
  async getMe(@Request() req: any) {
    return req.user;
  }
}
