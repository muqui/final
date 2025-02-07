

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';

export class CreateOrderDto {

  @IsNotEmpty ()
  @IsEmail ()
  clientEmail: string;

  @IsNotEmpty ()
  clientDni: number;

  @IsEnum (EquipmentType)
  equipmentType: EquipmentType;

  @IsString ()
  @IsNotEmpty ()
  imei: string;

  @IsOptional () 
  assignedTechnicianId?: string;

  @IsNotEmpty ()
  @IsString ()
  description: string;  

  @IsString ()
  @IsNotEmpty ()
  status: OrderStatus; 
  
}

