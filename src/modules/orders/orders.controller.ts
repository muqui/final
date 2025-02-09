


import { Controller, Patch, Param, Body, Get, Post, Delete, Put } from '@nestjs/common';

import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { OrderStatus } from '../../enum/orderstatus.enum';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderHistoriesService: OrderHistoriesService,
  ) {}


  @Get ()

  async getAllOrders (): Promise<Order []> {

    return this.ordersService.getAllOrders ();


  }

  
  @Get ('email/:clientEmail')

  async getOrdersByClientEmail (@Param ('clientEmail') clientEmail: string): Promise<Order []> {

    return this.ordersService.getOrdersByClientEmail (clientEmail);

  }


  @Get ('technician/:technId')
  async getOrdersByTechnId (@Param ('technId') technId: string): Promise<Order []> {
    return this.ordersService.getOrdersByTechnId (technId);
  }

  @Get ('status/:status')

  async getByStatus (@Param ('status') status: OrderStatus): Promise<Order []> {

    return this.ordersService.getByStatus (status);

  }

  @Get (':id')

  async getOrderById (@Param ('id') orderId: string): Promise<Order> {

    return this.ordersService.getOrderById (orderId);

  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id')
  async update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {

    const updatedOrder = await this.ordersService.update (orderId, updateOrderDto);


    if (updateOrderDto.status) {
      let eventMessage = '';

      switch (updateOrderDto.status) {
        case OrderStatus.STARTED:
          eventMessage = 'Servicio iniciado';
          break;
        case OrderStatus.COMPLETED:
          eventMessage = 'Servicio finalizado';
          break;
      }

      if (eventMessage) {
        await this.orderHistoriesService.create({
          orderId,
          event: eventMessage,

          createdAt: new Date (),


        });
      }
    }

    return updatedOrder;
  }

@Put('inactivate/:id')
async inactivedelete(
@Param('id') orderId: string,
@Body() updateOrderDto: UpdateOrderDto
): Promise<{ message: string }> {
  return this.ordersService.inactiveDelete(orderId, updateOrderDto);
}

  
}
