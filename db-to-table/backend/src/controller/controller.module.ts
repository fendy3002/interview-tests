import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { TableFileImportController } from './table-file-import.controller';
import { TableController } from './table.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TableFileImportController, TableController],
  providers: [],
})
export class ControllerModule {}
