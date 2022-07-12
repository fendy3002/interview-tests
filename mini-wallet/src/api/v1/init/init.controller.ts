import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { STATUS_SUCCESS } from 'src/constants/status';
import { AccountService } from 'src/services/account.service';

import { InitRequest } from './requests/init.request';

@Controller()
export class InitController {
  constructor(private accountService: AccountService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  @HttpCode(201)
  async init(@Body() body: InitRequest) {
    const initResult = await this.accountService.init(body.customerXid);
    return {
      data: {
        token: initResult.token,
      },
      status: STATUS_SUCCESS,
    };
  }
}
