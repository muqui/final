import {
  isEmail,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enum/Role.enum';

export class SignUpUserDto {
  @IsNotEmpty({ message: 'El campo Nombre es Obligatorio' })
  @MinLength(3, { message: 'El nombre debe ser de minimo 3 caracteres' })
  @IsString()
  name: string;

  @IsNotEmpty({
    message: 'El campo Correo Electronico es Obligatorio, con formato Email',
  })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'El campo Contraseña es Obligatorio' })
  @MinLength(10, { message: 'La contraseña debe ser de minimo 10 caracteres' })
  password: string;

  @IsNotEmpty({
    message: 'El rol del usuario es obligatorio. Debe ser TECNICO O ADMIN',
  })
  @IsEnum(Role)
  @IsString()
  role: string;
}
