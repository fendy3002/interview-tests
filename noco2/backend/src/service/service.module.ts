import { Module } from '@nestjs/common';
import { TableModules } from './table/table.modules';
import { ImportModules } from './import/import.modules';

@Module({
  imports: [],
  controllers: [],
  providers: [...TableModules, ...ImportModules],
})
export class ServiceModule {}
