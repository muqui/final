import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { SeedService } from './seeder.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';



@ApiTags('Seeder')
@Controller('seeder')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}
    @Get()
  @ApiOperation({
    summary: 'Insertar informacion para users, orders, evidences iniciales',
    description: 'Este endpoint siembra datos iniciales d en la base de datos.',
  })
  seedProducts() {
     
     return this.seedService.seedData();
  }

 

 
}
