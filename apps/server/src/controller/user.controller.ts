import { Controller, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserJWTGuard } from '../middleware/user_jwt.guard';

const logger = new Logger('UserController');
@ApiBearerAuth('user-jwt-token')
@ApiTags('User')
@UseGuards(UserJWTGuard)
@Controller('user')
export class UserController {
  constructor() {}
}
