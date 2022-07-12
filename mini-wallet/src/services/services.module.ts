import { Module } from '@nestjs/common';

import { InitService } from './init.service';
import { WalletService } from './wallet.service';

@Module({
  imports: [],
  controllers: [],
  providers: [InitService, WalletService],
})
export class ServicesModule {}
