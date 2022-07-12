import { Module } from '@nestjs/common';

import { ApiV1Module } from './api/v1/api-v1.module';
import { GlobalModule } from './global.module';

@Module({
  imports: [GlobalModule, ApiV1Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
