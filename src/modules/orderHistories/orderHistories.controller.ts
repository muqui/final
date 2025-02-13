

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { CreateOrderHistoriesDto } from '../../dto/orderHistories/createOrderHistories.dto';  

@Controller ('orderhistories')

export class OrderHistoriesController {

  constructor(private readonly orderHistoriesService: OrderHistoriesService) {}

  @Get ()

  async getAllOrderHistories () {

    return await this.orderHistoriesService.getAllOrderHistories ();

  }

  @Get (':orderId')

  async getOrderHistory (@Param('orderId') orderId: string) {

    return await this.orderHistoriesService.getOrderHistory (orderId);

  }

  @Post ('event')

  async createOrderEvent (@Body () createOrderHistoryDto: CreateOrderHistoriesDto) {

    return await this.orderHistoriesService.createOrderEvent (createOrderHistoryDto);

  }

}


