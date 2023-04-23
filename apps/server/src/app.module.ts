import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import * as modules from './modules';

@Module({
  imports: [...CoreModule, ...Object.values(modules)],
})
export class AppModule {}
