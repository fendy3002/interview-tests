import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsyncBullConfig } from './bull/async-bull-config';
import appConfig from './config/app.config';
import { ControllerModule } from './controller/controller.module';
import { TypeOrmConfigService } from './database/typeorm';
import { ServiceModule } from './service/service.module';
import { WorkerModule } from './worker/worker.module';

// if we want to separate instance between worker and api
const isBackgroundWorker = process.env.BACKGROUND_WORKER === 'true';
const isApiApp = process.env.API_APP === 'true';

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
    ...(isBackgroundWorker ? [WorkerModule] : []),
    ...(isApiApp ? [ControllerModule] : []),
    ServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
