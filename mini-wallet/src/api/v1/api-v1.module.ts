import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from 'src/middlewares/auth.middleware';
import { ServicesModule } from 'src/services/services.module';

import { InitController } from './init/init.controller';
import { WalletController } from './wallet/wallet.controller';

@Module({
  imports: [ServicesModule],
  controllers: [InitController, WalletController],
  providers: [],
})
export class ApiV1Module {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(WalletController);
  }
}
