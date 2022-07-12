import { Expose } from 'class-transformer';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class InitRequest {
  @IsNotEmpty()
  @IsUUID()
  @Expose({ name: 'customer_xid' })
  customerXid: string;
}
