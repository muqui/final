
import {

  IsNotEmpty,
  IsUUID,

} from 'class-validator';

export class CreateOrderDto {  
  
  @IsNotEmpty ()  
  @IsUUID ()  
  clientId?: string;  
  
  @IsNotEmpty ()  
  @IsUUID ()  
  assignedTechnicianId?: string;  

  @IsNotEmpty ()  
  @IsUUID ()  
  userId: string;

}