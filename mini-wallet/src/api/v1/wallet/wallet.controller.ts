import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('api/v1/wallet')
export class WalletController {
  constructor() {}

  @Post('')
  postWallet() {}

  @Get('')
  getWallet() {}

  @Post('/deposits')
  deposits() {}

  @Post('/withdrawals')
  withdrawals() {}

  @Patch('')
  disable() {}
}
