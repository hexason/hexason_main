import { Module } from '@nestjs/common';
import { CoreModule } from './config';
import * as modules from './modules';

@Module({
  imports: [...CoreModule, ...Object.values(modules)],
})
export class AppModule {}
