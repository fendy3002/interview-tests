import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { WalletService } from './wallet.service';

@Module({
  imports: [InMemoryDBModule.forRoot()],
  controllers: [],
  providers: [AccountService, WalletService],
  exports: [AccountService, WalletService],
})
export class ServicesModule {}
