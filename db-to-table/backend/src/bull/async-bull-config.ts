import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AsyncBullConfig {
  constructor(private readonly configService: ConfigService) {}
  async createSharedConfiguration() {
    return {
      url: this.configService.get('redis.url'),
      prefix: `{app}`,
    };
  }
}
