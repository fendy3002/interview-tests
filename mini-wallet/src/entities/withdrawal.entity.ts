import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface WithdrawalEntity extends InMemoryDBEntity {
  id: string;
  wallet_id: string;
  // this is required due to limitation in InMemoryDB
  // should not required in real database
  type: string;
  withdrawn_by: string;
  status: string;
  withdrawn_at: Date;
  amount: number;
  reference_id: string;
}
