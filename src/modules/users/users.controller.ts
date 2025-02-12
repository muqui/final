import { Body, Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from 'src/enum/Role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get('/findByRole/:id')
  async findByRole(@Param('id') id: string, @Body() role: Role) {
    return await this.usersService.findByRole(id, role);
  }
}


 
