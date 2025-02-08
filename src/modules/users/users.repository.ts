import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(@InjectRepository(User) users: Repository<User>) {}
}
