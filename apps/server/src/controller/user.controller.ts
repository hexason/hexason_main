import { Body, Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../service/user.service';
import { UserJWTGuard } from '../middleware/user_jwt.guard';

const logger = new Logger('UserController');
@ApiBearerAuth('user-jwt-token')
@ApiTags('User')
@UseGuards(UserJWTGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("order/create")
  async createOrder(@Body() body: any, @Request() req: any) {
    
    
  }

  @Post("info/update")
  async updateInfo(@Body() body: any, @Request() req: any) {
     const { city, district, address, phone } = body;
     const { user } = req;
     const initedUser = await this.userService.initUser(user.sub);
     const updatedUser = await this.userService.updateUser(initedUser.sub, { city, district, address, phone });
    return updatedUser;
  }
}
