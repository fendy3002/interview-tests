import { Expose } from 'class-transformer';
import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';

export class InitRequest {
  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'customer_xid' })
  @IsDefined()
  customerXid: string;
}
