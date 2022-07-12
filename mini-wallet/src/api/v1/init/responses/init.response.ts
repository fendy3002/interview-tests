import { IResponseData } from 'src/interfaces/IResponseData';

export type InitResponse = IResponseData<{
  token: string;
}>;
