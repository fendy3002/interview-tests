import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';

import { InitController } from './init/init.controller';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [ServicesModule],
  controllers: [InitController, WalletController],
  providers: [],
})
export class ApiV1Module {}
