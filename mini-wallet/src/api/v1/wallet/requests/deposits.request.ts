import { Expose, Transform } from 'class-transformer';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class DepositsRequest {
  @IsNotEmpty()
  @Expose({ name: 'amount' })
  @Transform(({ value }) => parseInt(value))
  @IsDefined()
  amount: number;

  @IsNotEmpty()
  @Expose({ name: 'reference_id' })
  @IsDefined()
  @IsString()
  @IsUUID()
  referenceId: string;
}
