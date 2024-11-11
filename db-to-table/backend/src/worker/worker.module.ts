import { Module } from '@nestjs/common';

import { ServiceModule } from 'src/service/service.module';
import { JobProcessorModules } from './job-processor/job-processor.modules';

@Module({
  imports: [ServiceModule],
  providers: [...JobProcessorModules],
  exports: [],
})
export class WorkerModule {}
