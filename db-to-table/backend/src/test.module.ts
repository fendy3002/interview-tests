import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AsyncBullConfig } from './bull/async-bull-config';
import appConfig from './config/app.config';
import { ControllerModule } from './controller/controller.module';
import { TypeOrmConfigService } from './database/typeorm';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useClass: AsyncBullConfig,
    }),

    ControllerModule,
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class TestModule {}
