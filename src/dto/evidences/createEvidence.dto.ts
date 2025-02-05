import { Type } from "class-transformer";
import { IsArray, IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, IsUrl, MinLength, ValidateNested } from "class-validator";


export class CreateEvidenceDto {
    
  /**
     * Id de la orden
     * @example  1
     */
  @IsString()
  orderId: string;

   /**
     * Id de la orden
     * @example  www.url.com
     */
   @IsString()
   @MinLength(1)
   @IsUrl()
   fileUrl?: string;



 
 

}