import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enum/Role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByRole(id: string, role: Role) {
    return await this.usersRepository.findByRole(id, role);
  }
}
