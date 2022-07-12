import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface AccountEntity extends InMemoryDBEntity {
  customerXid: string;
  token: string;
}
