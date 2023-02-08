import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import { UserJWTGuard } from '../middleware/user_jwt.guard';
import { UserService } from './user.service';

class WithdrawDTO {
  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  address: string;
}
const logger = new Logger('UserController');
@ApiBearerAuth('user-jwt-token')
@ApiTags('User')
@UseGuards(UserJWTGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('init')
  async userInit(@Request() { user }, @Query('refer') refer?: string) {
    console.log(refer);
    return this.userService.init(user.id, refer);
  }

  @Get('wallet/check')
  async checkAddress(@Request() { user }) {
    return this.userService.deposit(user.id);
  }

  @Get('status')
  async userStatus(@Request() { user }) {
    return this.userService.status(user.id);
  }

  @Post('withdraw')
  async withdraw(
    @Request() { user },
    @Body() { amount, address }: WithdrawDTO,
  ) {
    return this.userService.withdraw(user.id, address, amount);
  }
}
