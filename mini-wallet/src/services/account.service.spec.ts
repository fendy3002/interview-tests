import { Test } from '@nestjs/testing';

import { AccountService } from './account.service';
import { ServicesModule } from './services.module';

describe(`AccountService`, () => {
  let accountService: AccountService;
  beforeEach(async () => {
    const app = await Test.createTestingModule({
      imports: [ServicesModule],
    }).compile();
    accountService = app.get(AccountService);
  });
  it(`it`, async () => {
    // await accountService
  });
});
