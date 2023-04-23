import { Auth } from './auth.decorator';
import { Controller, Request, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  @Auth()
  @Get('me')
  async getMe(@Request() req: any) {
    return req.user;
  }
}
