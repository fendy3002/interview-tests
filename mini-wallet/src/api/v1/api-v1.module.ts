import { Module } from '@nestjs/common';

import { InitController } from './init/init.controller';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [],
  controllers: [],
  providers: [InitController, WalletController],
})
export class ApiV1Module {}
