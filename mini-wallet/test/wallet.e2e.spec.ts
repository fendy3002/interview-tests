import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('WalletController (e2e)', () => {
  let app: INestApplication;
  let initializedAccount: { token: string } = null;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

    const customer_xid = 'ea0212d3-abd6-406f-8c67-868e814a2436';
    const response = await request(app.getHttpServer())
      .post('/api/v1/init')
      .set({ 'content-type': 'multipart/form-data' })
      .field('customer_xid', customer_xid)
      .expect(201);
    initializedAccount = { token: response.body.data.token };
  });
  afterAll(async () => {
    app.close();
  });

  it('GET /api/v1/wallet and receive 401 error', async () => {
    const customer_xid = 'ea0212d3-abd6-406f-8c67-868e814a2436';
    const response = await request(app.getHttpServer())
      .get('/api/v1/wallet')
      .expect(401);
  });

  it('GET /api/v1/wallet and receive 200 success', async () => {
    const customer_xid = 'ea0212d3-abd6-406f-8c67-868e814a2436';
    const response = await request(app.getHttpServer())
      .get('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(200);
  });
});
