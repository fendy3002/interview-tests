import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';
import { Database } from './database.types';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const database = this.configService.get<Database>('database');
    // if using testing
    if (database.type === 'better-sqlite3') {
      return {
        type: database.type,
        database: database.database,
        dropSchema: true,
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        synchronize: true,
      };
    }

    return {
      type: database.type,
      host: database.host,
      port: database.port,
      username: database.username,
      password: database.password,
      database: database.name,
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      // it may be better to have migrations in separate project
      // or in separate folder to execute independently
      migrations: [join(__dirname, 'migration', '*.{ts,js}')],
      synchronize: false,
    };
  }
}
