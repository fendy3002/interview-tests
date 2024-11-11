import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModules } from './storage/storage.modules';
import { TableFileImportModules } from './table-file-import/table-file-import.modules';
import { TableModules } from './table/table.modules';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [],
  providers: [...TableModules, ...TableFileImportModules, ...StorageModules],
  exports: [...TableModules, ...TableFileImportModules, ...StorageModules],
})
export class ServiceModule {}
