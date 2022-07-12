import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { parseEnv } from './configs/parseEnv';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [parseEnv],
    }),
  ],
  controllers: [],
  providers: [],
})
export class GlobalModule {}
