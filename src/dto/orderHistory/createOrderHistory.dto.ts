import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHistoryDto {
  @IsNumber()
  @IsNotEmpty()
  orderId: string;

  @IsString()
  @IsNotEmpty()
  event: string;
}
