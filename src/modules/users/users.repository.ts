/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUserById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }
}*/

/*import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Role } from '../../enum/role.enum';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(@InjectRepository(User) private readonly userRepo: Repository<User>) {
    super(userRepo.target, userRepo.manager, userRepo.queryRunner);
  }

  async findByRole(role: Role): Promise<User[]> {
    return await this.find({ where: { role } });
  }

  async findUserById(id: string): Promise<User | null> {
    return await this.findOne({ where: { id } });
  }
}*/


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


