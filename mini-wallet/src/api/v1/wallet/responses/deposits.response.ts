import { IResponseData } from 'src/interfaces/IResponseData';

export type DespositsResponse = IResponseData<{
  deposit: {
    id: string;
    deposited_by: string;
    status: string;
    deposited_at: Date;
    amount: number;
    reference_id: string;
  };
}>;
