import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TestModule } from 'src/test.module';
import * as request from 'supertest';

describe('TableFileImportController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/table/import/csv (POST)', async () => {
    const filePath = `${__dirname}/data.csv`; // Path to the file you want to upload
    const response = await request(app.getHttpServer())
      .post('/api/table/import/csv')
      .set('Content-Type', 'multipart/form-data')
      .attach('file', filePath);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });
});
