import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { ImportController } from './import.controller';
import { TableController } from './table.controller';

@Module({
  imports: [ServiceModule],
  controllers: [ImportController, TableController],
  providers: [],
})
export class ControllerModule {}
