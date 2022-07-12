import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface DepositEntity extends InMemoryDBEntity {
  id: string;
  wallet_id: string;
  deposited_by: string;
  status: string;
  deposited_at: Date;
  amount: number;
  reference_id: string;
}
