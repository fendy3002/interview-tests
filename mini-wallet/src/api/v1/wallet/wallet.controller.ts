import { Controller, Get, HttpCode, Patch, Post, Req } from '@nestjs/common';

import { STATUS_SUCCESS } from 'src/constants/status';
import { AuthenticatedRequest } from 'src/interfaces/AuthenticatedRequest';
import { WalletService } from 'src/services/wallet.service';

import { DisableResponse } from './responses/disable.response';
import { EnableResponse } from './responses/enable.response';
import { GetResponse } from './responses/get.response';

@Controller('api/v1/wallet')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @HttpCode(201)
  @Post('')
  async enabletWallet(
    @Req() req: AuthenticatedRequest,
  ): Promise<EnableResponse> {
    const enableResult = await this.walletService.enable(
      req.account.customerXid,
    );
    return {
      status: STATUS_SUCCESS,
      data: {
        wallet: enableResult,
      },
    };
  }

  @Get('')
  async getWallet(@Req() req: AuthenticatedRequest): Promise<GetResponse> {
    const result = await this.walletService.findOne(req.account.customerXid);

    return {
      status: STATUS_SUCCESS,
      data: {
        wallet: result,
      },
    };
  }

  @Post('/deposits')
  deposits() {}

  @Post('/withdrawals')
  withdrawals() {}

  @Patch('')
  async disable(@Req() req: AuthenticatedRequest): Promise<DisableResponse> {
    const disableResult = await this.walletService.disable(
      req.account.customerXid,
    );
    return {
      status: STATUS_SUCCESS,
      data: {
        wallet: disableResult,
      },
    };
  }
}
