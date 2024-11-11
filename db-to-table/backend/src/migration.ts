import { NestFactory } from '@nestjs/core';
import { getDataSourceToken } from '@nestjs/typeorm';
import { AppModule } from './app.module';

// for test only
// may be on separate project if want
async function runMigration() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(getDataSourceToken());
  await dataSource.runMigrations();
  await app.close();
}
runMigration();
