import { Module } from '@nestjs/common';
import { ControllerModule } from './controller/controller.module';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [ControllerModule, ServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
