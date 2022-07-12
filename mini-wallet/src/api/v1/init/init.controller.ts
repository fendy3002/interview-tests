import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { STATUS_SUCCESS } from 'src/constants/status';
import { AccountService } from 'src/services/account.service';
import { WalletService } from 'src/services/wallet.service';

import { InitRequest } from './requests/init.request';
import { InitResponse } from './responses/init.response';

@Controller('/api/v1/init')
export class InitController {
  constructor(
    private accountService: AccountService,
    private walletService: WalletService,
  ) {}

  @UseInterceptors(FileInterceptor('_'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('')
  @HttpCode(201)
  async init(@Body() body: InitRequest): Promise<InitResponse> {
    const initResult = await this.accountService.init(body.customerXid);
    await this.walletService.create(body.customerXid);
    return {
      data: {
        token: initResult.token,
      },
      status: STATUS_SUCCESS,
    };
  }
}
