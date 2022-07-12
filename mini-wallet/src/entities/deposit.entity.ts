import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface DepositEntity extends InMemoryDBEntity {
  id: string;
  wallet_id: string;
  // this is required due to limitation in InMemoryDB
  // should not required in real database
  type: string;
  deposited_by: string;
  status: string;
  deposited_at: Date;
  amount: number;
  reference_id: string;
}
