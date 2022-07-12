import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
} from '@nestjs/common';

import { STATUS_SUCCESS } from 'src/constants/status';
import { AuthenticatedRequest } from 'src/interfaces/AuthenticatedRequest';
import { WalletService } from 'src/services/wallet.service';

import { DepositsRequest } from './requests/deposits.request';
import { DespositsResponse } from './responses/deposits.response';
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
  async deposits(
    @Req() req: AuthenticatedRequest,
    @Body() body: DepositsRequest,
  ): Promise<DespositsResponse> {
    const depositsResult = await this.walletService.deposits(
      body.amount,
      body.referenceId,
      req.account.customerXid,
    );
    return {
      status: STATUS_SUCCESS,
      data: {
        deposit: {
          id: depositsResult.id,
          deposited_by: depositsResult.deposited_by,
          status: depositsResult.status,
          deposited_at: depositsResult.deposited_at,
          amount: depositsResult.amount,
          reference_id: depositsResult.reference_id,
        },
      },
    };
  }

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
