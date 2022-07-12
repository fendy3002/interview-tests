import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { AccountEntity } from 'src/entities/account.entity';

@Injectable()
export class AccountService {
  constructor(private accountRepository: InMemoryDBService<AccountEntity>) {}
  async init(customerXid: string) {
    const token = randomUUID();
    const accountToCreate = {
      customerXid: customerXid,
      token: token,
    };
    await this.accountRepository.create(accountToCreate);
    return accountToCreate;
  }

  async findByToken(token: string) {
    const foundAccounts = await this.accountRepository.query(
      (data) => data.token == token,
    );
    if (foundAccounts && foundAccounts.length > 0) {
      return foundAccounts[0];
    }
    return null;
  }
}
