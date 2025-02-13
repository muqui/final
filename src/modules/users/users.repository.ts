import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enum/Role.enum';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.usersRepository.find();
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async findByRole(id: string, role: Role): Promise<User> {
    const userFound = await this.usersRepository.findOne({
      where: { id, role },
    });

    if (!userFound) {
      throw new NotFoundException('User Not Exist');
    }

    return userFound;
  }

  async changeRole(role: Partial<User>, id: string) {
    console.log(typeof role.role);

    const userFound = await this.usersRepository.findOne({ where: { id } });

    if (!userFound) {
      throw new NotFoundException('El usuario no existe');
    }

    if (!Role[role.role]) {
      throw new BadRequestException(
        `El rol ${role.role} no es válido. Solo es posible:${Object.values(Role).join(',')}`,
      );
    }

    if (Role[role.role] === userFound.role) {
      throw new BadRequestException('El usuario ya tiene ese rol.');
    }

    await this.usersRepository.update(id, { role: role.role });

    return {
      success: true,
      message: 'Rol cambiado correctamente',
    };
  }
}
