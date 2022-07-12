import { WalletEntity } from 'src/entities/wallet.entity';
import { IResponseData } from 'src/interfaces/IResponseData';

export type GetResponse = IResponseData<{
  wallet: WalletEntity;
}>;
