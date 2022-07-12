import { IResponseData } from 'src/interfaces/IResponseData';

export type WithdrawalsResponse = IResponseData<{
  withdrawal: {
    id: string;
    withdrawn_by: string;
    status: string;
    withdrawn_at: Date;
    amount: number;
    reference_id: string;
  };
}>;
