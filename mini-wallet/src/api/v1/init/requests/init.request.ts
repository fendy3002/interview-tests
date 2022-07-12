import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class InitRequest {
  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'customer_xid' })
  @IsDefined()
  @IsString()
  customerXid: string;
}
