import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import {
  AdminAddDTO,
  AdminLoginDTO,
  AdminTokenRefreshDTO,
} from './dto/AdminControllerDto';
import { Admin } from '@/models/admin.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AdminJWTGuard } from '@/middleware/admin_jwt.guard';
import { OrderService } from '@/service/order.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    @InjectDataSource() private readonly datasource: DataSource,
    private readonly orderService: OrderService,
  ) { }

  @Post('login')
  async adminLogin(@Body() { username, password }: AdminLoginDTO) {
    const adminRepo = this.datasource.getRepository(Admin);
    const admin = await adminRepo.findOneBy({
      username,
    });
    if (!admin) throw new HttpException('ADMIN_NOT_FOUND', 404);
    const isPassValid = await compare(password, admin.credential);
    if (isPassValid) {
      const access_token = sign(
        {
          sub: admin.id,
          role: admin.role,
          name: admin.name,
        },
        process.env.SUPER_SECRET,
        { expiresIn: '15m' },
      );
      const refresh_token =
        Date.now().toString(32) + Math.random().toString(32).replace('0.', '');
      admin.refreshToken = refresh_token;
      await adminRepo.save(admin);
      return {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        access_token,
        refresh_token,
      };
    }
    throw new HttpException('CREDENTIAL_ERROR', 403);
  }

  @Post('refresh')
  async refreshToken(@Body() { refresh_token }: AdminTokenRefreshDTO) {
    const adminRepo = this.datasource.getRepository(Admin);
    const admin = await adminRepo.findOneBy({
      refreshToken: refresh_token,
    });
    if (!admin) throw new HttpException('FORBIDDEN_ERROR', 403);
    const access_token = sign({}, process.env.SUPER_SECRET, {
      expiresIn: '15m',
    });
    refresh_token =
      Date.now().toString(32) + Math.random().toString(32).replace('0.', '');
    admin.refreshToken = refresh_token;
    await adminRepo.save(admin);
    return {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      access_token,
      refresh_token,
    };
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Get('me')
  async getMe(@Request() { user }) {
    const adminRepo = this.datasource.getRepository(Admin);
    const admin = await adminRepo.findOneBy({
      id: user.sub,
    });
    if (!admin) throw new HttpException('FORBIDDEN_ERROR', 403);
    const access_token = sign({}, process.env.SUPER_SECRET, {
      expiresIn: '15m',
    });
    const refresh_token =
      Date.now().toString(32) + Math.random().toString(32).replace('0.', '');
    admin.refreshToken = refresh_token;
    await adminRepo.save(admin);
    return {
      id: admin.id,
      username: admin.username,
      name: admin.name,
      access_token,
      refresh_token,
    };
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('logout')
  async logout(@Request() { user }: any) {
    const adminRepo = this.datasource.getRepository(Admin);
    const admin = await adminRepo.findOneBy({ id: user.sub });
    if (!admin) throw new HttpException('SOMETHING_WENT_WRONG', 500);
    admin.refreshToken = null;
    await adminRepo.save(admin);
    return true;
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('add')
  async adminAdd(@Body() { username, name, password, role }: AdminAddDTO) {
    const adminRepo = this.datasource.getRepository(Admin);
    const haveUsername = await adminRepo.findOneBy({ username });
    if (haveUsername)
      throw new HttpException('ADMIN_ALREADY_REGISTER_ERROR', 400);

    try {
      const hashingBcrypt = await hash(password, 10);
      const prepare = adminRepo.create({
        username,
        name,
        credential: hashingBcrypt,
        role,
      });
      await adminRepo.save(prepare);
      delete prepare.credential;
      return prepare;
    } catch (e) {
      throw new HttpException('SOMETHING_WENT_WRONG', 500);
    }
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Get('orders')
  async getOrders() {
    const order = await this.orderService.getAllOrders();
    return order;
  }
}
