import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './models/admin.model';
import { SupplierAdmin } from './models/supplier_admin.model';
import { Permission, Role } from './models';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Admin, SupplierAdmin, Role, Permission])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AuthModule {}
