import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @IsEmail()
  @IsNotEmpty()
  readonly clientEmail: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  @IsNotEmpty()
  readonly clientDni: number;
}
