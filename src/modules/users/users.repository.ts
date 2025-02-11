import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';
import { Role } from 'src/enum/Role.enum';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
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
}
