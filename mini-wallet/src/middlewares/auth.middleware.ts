import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from 'src/interfaces/AuthenticatedRequest';
import { AccountService } from 'src/services/account.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private accountService: AccountService) {}
  async use(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return next(
        new UnauthorizedException(null, 'Authorization header is required'),
      );
    }
    const token = req.headers.authorization.replace('Token ', '');
    const account = await this.accountService.findByToken(token);
    if (account) {
      req.account = account;
      return next();
    } else {
      return next(new UnauthorizedException(null, 'Token not found'));
    }
  }
}
