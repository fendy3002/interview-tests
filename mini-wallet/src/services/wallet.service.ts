import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import {
  DEPOSITS_STATUS_SUCCESS,
  WALLET_STATUS_DISABLED,
  WALLET_STATUS_ENABLED,
} from 'src/constants/status';
import { DepositEntity } from 'src/entities/deposit.entity';
import { WalletEntity } from 'src/entities/wallet.entity';
import { WithdrawalEntity } from 'src/entities/withdrawal.entity';

@Injectable()
export class WalletService {
  constructor(
    private walletRepository: InMemoryDBService<WalletEntity>,
    private depositRepository: InMemoryDBService<DepositEntity>,
    private withdrawalRepository: InMemoryDBService<WithdrawalEntity>,
  ) {}

  async validateWalletActive(wallet: WalletEntity) {
    if (!wallet) {
      throw new NotFoundException();
    }
    if (wallet.status != WALLET_STATUS_ENABLED) {
      throw new BadRequestException('Wallet is disabled');
    }
  }

  async create(customerXid: string) {
    // should add if exists checks
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
      throw new NotFoundException();
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
    await this.validateWalletActive(foundWallet);

    foundWallet.status = WALLET_STATUS_DISABLED;
    await this.walletRepository.update(foundWallet);
    return foundWallet;
  }

  async findOne(customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    await this.validateWalletActive(foundWallet);
    return foundWallet;
  }

  async deposits(amount: number, referenceId: string, customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    await this.validateWalletActive(foundWallet);

    const foundDeposit = await this.depositRepository.query(
      (data) => data.reference_id == referenceId,
    )?.[0];
    if (foundDeposit) {
      throw new BadRequestException('Deposit with reference id already exists');
    }

    const createUuid = randomUUID();
    const depositToInsert = {
      id: createUuid,
      amount: amount,
      deposited_at: new Date(),
      deposited_by: customerXid,
      status: DEPOSITS_STATUS_SUCCESS,
      wallet_id: foundWallet.id,
      reference_id: referenceId,
    };
    await this.depositRepository.create(depositToInsert);
    foundWallet.balance += amount;
    await this.walletRepository.update(foundWallet);

    return depositToInsert;
  }

  async withdrawals(amount: number, referenceId: string, customerXid: string) {
    const foundWallet = await this.walletRepository.query(
      (data) => data.owned_by == customerXid,
    )?.[0];
    await this.validateWalletActive(foundWallet);
    if (foundWallet.balance < amount) {
      throw new BadRequestException(
        `Wallet balance less than withdrawals amount`,
      );
    }

    const foundWithdrawal = await this.withdrawalRepository.query(
      (data) => data.reference_id == referenceId,
    )?.[0];
    if (foundWithdrawal) {
      throw new BadRequestException(
        'Withdrawal with reference id already exists',
      );
    }

    const createUuid = randomUUID();
    const withdrawalToInsert = {
      id: createUuid,
      amount: amount,
      withdrawn_at: new Date(),
      withdrawn_by: customerXid,
      status: DEPOSITS_STATUS_SUCCESS,
      wallet_id: foundWallet.id,
      reference_id: referenceId,
    };
    await this.withdrawalRepository.create(withdrawalToInsert);
    foundWallet.balance -= amount;
    await this.walletRepository.update(foundWallet);

    return withdrawalToInsert;
  }
}
