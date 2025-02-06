

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { CreateOrderHistoriesDto } from '../../dto/orderHistories/createOrderHistories.dto';  // Importamos el DTO

@Controller ('orderhistories')

export class OrderHistoriesController {

  constructor (private readonly orderHistoriesService: OrderHistoriesService) {}

  @Get ()

  async getAll () {

    return await this.orderHistoriesService.getAll ();

  }

  @Get (':Id')

  async getOrderHistory (@Param ('orderId') orderId: string) {

    return await this.orderHistoriesService.getById (orderId);

  }

  @Post ()

  async create (@Body () createOrderHistoryDto: CreateOrderHistoriesDto) {

    return await this.orderHistoriesService.create (createOrderHistoryDto);

  }  

}

