import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { OrdersRepository } from '../orders/orders.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],

  exports: [OrdersRepository],
})
export class UsersModule {}
