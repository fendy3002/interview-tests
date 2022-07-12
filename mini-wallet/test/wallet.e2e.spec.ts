import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { randomUUID } from 'crypto';
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

  it('POST /api/v1/wallet and receive 401 error', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet')
      .expect(401);
  });

  it('POST /api/v1/wallet and receive 201 created', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(201);
  });

  it('POST /api/v1/wallet and receive 400 wallet already enabled', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(400);
    expect(response.body.message).toBe('Wallet already enabled');
  });

  it('GET /api/v1/wallet and receive 200 success', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(200);
    expect(response.body.data.wallet).toBeDefined();
  });

  it('POST /api/v1/wallet/deposits and receive 201 created', async () => {
    const amount = 5000;
    const reference_id = randomUUID();
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet/deposits')
      .set({ 'content-type': 'multipart/form-data' })
      .set('authorization', `Token ${initializedAccount.token}`)
      .field('amount', amount)
      .field('reference_id', reference_id)
      .expect(201);
    expect(response.body.data.deposit).toBeDefined();
    expect(response.body.data.deposit.amount).toBe(amount);
    expect(response.body.data.deposit.reference_id).toBe(reference_id);

    const getResponse = await request(app.getHttpServer())
      .get('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(200);
    expect(getResponse.body.data.wallet.balance).toBe(amount);
  });

  it('POST /api/v1/wallet/withdrawals and receive 201 created', async () => {
    const amount = 5000;
    const reference_id = randomUUID();
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet/withdrawals')
      .set({ 'content-type': 'multipart/form-data' })
      .set('authorization', `Token ${initializedAccount.token}`)
      .field('amount', amount)
      .field('reference_id', reference_id)
      .expect(201);
    expect(response.body.data.withdrawal).toBeDefined();
    expect(response.body.data.withdrawal.amount).toBe(amount);
    expect(response.body.data.withdrawal.reference_id).toBe(reference_id);

    const getResponse = await request(app.getHttpServer())
      .get('/api/v1/wallet')
      .set('authorization', `Token ${initializedAccount.token}`)
      .expect(200);
    expect(getResponse.body.data.wallet.balance).toBe(0);
  });

  it('POST /api/v1/wallet/withdrawals and receive 400 bad request', async () => {
    const amount = 5000;
    const reference_id = randomUUID();
    const response = await request(app.getHttpServer())
      .post('/api/v1/wallet/withdrawals')
      .set({ 'content-type': 'multipart/form-data' })
      .set('authorization', `Token ${initializedAccount.token}`)
      .field('amount', amount)
      .field('reference_id', reference_id)
      .expect(400);

    expect(response.body.message).toBe(
      'Wallet balance less than withdrawals amount',
    );
  });
});
