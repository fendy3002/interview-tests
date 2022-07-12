import { Request as ExpressRequest } from 'express';
import { AccountEntity } from 'src/entities/account.entity';

export interface AuthenticatedRequest extends ExpressRequest {
  account: AccountEntity;
}
