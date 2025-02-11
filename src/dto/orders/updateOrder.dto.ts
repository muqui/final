

import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './createOrder.dto';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { OrderStatus } from 'src/enum/orderstatus.enum';

export class UpdateOrderDto extends PartialType (CreateOrderDto) {

  @IsOptional ()
  @IsEnum (OrderStatus)
  status?: OrderStatus;  
  
  @IsOptional ()
  @IsString ()
  assignedTechnicianId?: string;

  @IsOptional ()
  @IsBoolean ()
  isActive?: boolean;

}
