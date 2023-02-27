import { App } from '../models';
import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  ConfigCreateDTO,
  ConfigUpdateBankDTO,
  ConfigUpdateDTO,
} from './dto/ConfigControllerDto';
import { AdminJWTGuard } from '../middleware/admin_jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('config')
export class ConfigController {
  appRepo: Repository<App>;
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {
    this.appRepo = this.dataSource.getRepository(App);
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('update')
  async configUpdate(@Body() { name, config }: ConfigUpdateDTO) {
    const app = await this.appRepo.findOneBy({
      name,
    });
    if (!app) throw new HttpException('NOT_FOUND_CONFIG', 404);
    app.config = config;
    await this.appRepo.save(app);

    return app;
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('update/bank')
  async configUpdateBank(@Body() bank: ConfigUpdateBankDTO) {
    let app = await this.appRepo.findBy({
      type: 'config.bank',
    });

    if (app.length < 3)
      app = Object.keys(bank).map((el) =>
        this.appRepo.create({
          name: el,
          config: '',
          type: 'config.bank',
        }),
      );

    app = app.map((el) => {
      if (bank[el.name]) el.config = bank[el.name];
      return el;
    });
    await this.appRepo.save(app);

    return app;
  }

  @UseGuards(AdminJWTGuard)
  @ApiBearerAuth('admin-access')
  @Post('create')
  async configCreate(@Body() { name, config, type }: ConfigCreateDTO) {
    const app = this.appRepo.create({
      name,
      config,
      type,
    });
    app.config = config;
    await this.appRepo.save(app);
    return app;
  }
}
