import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StorageModules } from './storage/storage.modules';
import { TableFileImportModules } from './table-file-import/table-file-import.modules';
import { TableModules } from './table/table.modules';
import { BullModule } from '@nestjs/bull';
import { ConfigModule } from '@nestjs/config';
import appConfig from '../config/app.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    ConfigModule.forRoot({
      load: [appConfig],
    }),

    BullModule.registerQueue({
      name: 'table-file-import-csv',
      prefix: `{app}`,
    }),
    BullModule.registerQueue({
      name: 'table-data-populate',
      prefix: `{app}`,
    }),
  ],
  controllers: [],
  providers: [...TableModules, ...TableFileImportModules, ...StorageModules],
  exports: [...TableModules, ...TableFileImportModules, ...StorageModules],
})
export class ServiceModule {}
