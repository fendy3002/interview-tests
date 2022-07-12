import { InMemoryDBEntity } from '@nestjs-addons/in-memory-db';

export interface WalletEntity extends InMemoryDBEntity {
  id: string;
  owned_by: string;
  status: string;
  enabled_at: Date;
  balance: number;
}
