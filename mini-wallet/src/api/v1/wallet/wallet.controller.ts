import { Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/interfaces/AuthenticatedRequest';

@Controller('api/v1/wallet')
export class WalletController {
  constructor() {}

  @Post('')
  postWallet() {}

  @Get('')
  getWallet(@Req() req: AuthenticatedRequest) {
    console.log('req.account', req.account);
    return null;
  }

  @Post('/deposits')
  deposits() {}

  @Post('/withdrawals')
  withdrawals() {}

  @Patch('')
  disable() {}
}
