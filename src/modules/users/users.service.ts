import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enum/Role.enum';
import { User } from './User.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findByRole(id: string, role: Role) {
    return await this.usersRepository.findByRole(id, role);
  }

  async changeRole(role: Partial<User>, id: string) {
    return await this.usersRepository.changeRole(role, id);
  }
}
