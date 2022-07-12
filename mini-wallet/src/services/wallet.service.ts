import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  WALLET_STATUS_DISABLED,
  WALLET_STATUS_ENABLED,
} from 'src/constants/status';
import { WalletEntity } from 'src/entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(private walletRepository: InMemoryDBService<WalletEntity>) {}
  async create(customerXid: string) {
    await this.walletRepository.create({
      id: randomUUID(),
      balance: 0,
      // this need to be visited later
      // since it'll follow NodeJS timezone
      enabled_at: new Date(),
      owned_by: customerXid,
      status: WALLET_STATUS_DISABLED,
    });
  }
  async enable(customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    if (!foundWallet) {
      // need to throw here
    }

    if (foundWallet.status == WALLET_STATUS_ENABLED) {
      throw new BadRequestException('Wallet already enabled');
    }
    foundWallet.status = WALLET_STATUS_ENABLED;
    await this.walletRepository.update(foundWallet);
    return foundWallet;
  }
  async disable(customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    if (!foundWallet) {
      throw new NotFoundException();
    }

    if (foundWallet.status == WALLET_STATUS_DISABLED) {
      throw new BadRequestException('Wallet already disabled');
    }
    foundWallet.status = WALLET_STATUS_DISABLED;
    await this.walletRepository.update(foundWallet);
    return foundWallet;
  }
  async findOne(customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    if (!foundWallet) {
      throw new NotFoundException();
    }
    if (foundWallet.status !== WALLET_STATUS_ENABLED) {
      throw new BadRequestException('Wallet is disabled');
    }
    return foundWallet;
  }
}
