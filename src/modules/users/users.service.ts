/*import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
}*/

/*import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './User.entity';
import { Role } from '../../enum/role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUsersByRole(role: Role): Promise<User[]> {
    return await this.usersRepository.find({ where: { role } });
  }
}*/



/*import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Role } from 'src/enum/Role.enum';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async findByRole(id: string, role: Role) {
    return await this.usersRepository.findByRole(id, role);
  }
}*/




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





