
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/enum/Role.enum';
import { User } from './User.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  @Get('/all')
  async findAll() {
    return await this.usersService.findAll();
  }


  @Get('/findByRole/:id')
  async findByRole(@Param('id') id: string, @Body() role: Role) {
    return await this.usersService.findByRole(id, role);
  }


  @Patch('/changeRole/:id')
  async changeRole(@Body() role: Partial<User>, @Param('id') id: string) {
    return await this.usersService.changeRole(role, id);
  }
}

