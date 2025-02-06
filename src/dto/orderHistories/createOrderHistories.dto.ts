

import { IsUUID, IsString, IsNotEmpty, IsDate } from 'class-validator';

export class CreateOrderHistoriesDto {

  @IsUUID ()
  @IsNotEmpty ()
  readonly orderId: string;

  @IsString ()
  @IsNotEmpty()
  readonly event: string;

  @IsDate ()
  @IsNotEmpty ()
  readonly dateTime: Date;

}
