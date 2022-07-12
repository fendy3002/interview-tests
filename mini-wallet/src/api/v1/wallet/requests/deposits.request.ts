import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class DepositsRequest {
  @IsNotEmpty()
  @Expose({ name: 'amount' })
  @IsDefined()
  amount: number;

  @IsNotEmpty()
  @Expose({ name: 'reference_id' })
  @IsDefined()
  @IsUUID()
  referenceId: string;
}
