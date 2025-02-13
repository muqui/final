

import { Controller, Patch, Param, Body, Get, Post, Put } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { Order } from './Order.entity';
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { UpdateTechicalDataDto } from 'src/dto/orders/updateTechData.dto';
import { UpdateStatusDto } from 'src/dto/orders/updateTechStatus.dto';

@Controller ('orders')

export class OrdersController {

  constructor (

    private readonly ordersService: OrdersService,
    private readonly orderHistoriesService: OrderHistoriesService,

  ) {}

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  @Get () // Endpoint verificado!

  async getAllOrders (): Promise<Order []> {

    return this.ordersService.getAllOrders ();

  }
  
  @Get ('email/:clientEmail') // Endpoint verificado!

  async getOrdersByClientEmail (@Param ('clientEmail') clientEmail: string): Promise<Order []> {

    return this.ordersService.getOrdersByClientEmail (clientEmail);


  }

  @Get ('technician/:technId') // Endpoint verificado!

  async getOrdersByTechnId (@Param ('technId') technId: string): Promise<Order []> {

    return this.ordersService.getOrdersByTechnId (technId);

  }

  /*@Get ('status/:status')

  async getByStatus (@Param ('status') status: OrderStatus): Promise<Order []> {

    return this.ordersService.getByStatus (status);

  }*/

  @Get (':id') // Endpoint verificado!

  async getOrderById (@Param ('id') orderId: string): Promise<Order> {

    return this.ordersService.getOrderById (orderId);

  }

  @Post ('create')

  async createOrder (@Body () createOrderDto: CreateOrderDto): Promise<Order> {

    return this.ordersService.createOrder (createOrderDto);

  }

  @Patch ('technicaldata/:id') // Endpoint verificado!

  async updateTechnicalData (

    @Param ('id') orderId: string,
    @Body () updateTechnicalDataDto: UpdateTechicalDataDto

  ): Promise<Order> {

    return this.ordersService.updateTechnicalData (orderId, updateTechnicalDataDto);

  }

  @Patch (':id/status') // Endpoint verificado!

  async updateOrderStatus (

    @Param ('id') orderId: string,
    @Body() updateStatusDto: UpdateStatusDto

  ): Promise<Order> {

    return this.ordersService.updateOrderStatus(orderId, updateStatusDto);

  }

  /* Este Endpoint es de uso exclusivo del/los Administrador(es).*/
  /* Falso Delete*/
  @Put ('inactivate/:id')

  async inactivedelete ( 

    @Param ('id') orderId: string,
    @Body () updateOrderDto: UpdateOrderDto

  ): Promise<{ message: string }> {

  return this.ordersService.inactiveDelete (orderId, updateOrderDto);

  }

} 