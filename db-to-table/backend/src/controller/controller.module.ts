import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { TableFileImportController } from './table-file-import.controller';
import { TableController } from './table.controller';
import { AppController } from './app.controller';

@Module({
  imports: [ServiceModule],
  controllers: [TableFileImportController, TableController, AppController],
  providers: [],
})
export class ControllerModule {}
