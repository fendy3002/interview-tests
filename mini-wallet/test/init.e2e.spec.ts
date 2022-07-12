import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('InitController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    app.close();
  });

  it('POST /api/v1/init', async () => {
    const customer_xid = 'ea0212d3-abd6-406f-8c67-868e814a2436';
    const response = await request(app.getHttpServer())
      .post('/api/v1/init')
      .set({ 'content-type': 'multipart/form-data' })
      .field('customer_xid', customer_xid)
      .expect(201);
    expect(response.body.status).toBe('success');
    expect(typeof response.body.data?.token).toBe('string');
  });
});
