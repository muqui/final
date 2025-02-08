import {
  Controller,
  Patch,
  Param,
  Body,
  Get,
  Post,
  Delete,
} from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';

import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { OrderHistoriesService } from '../orderHistories/orderHistories.service';
import { Order } from './Order.entity';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly orderHistoriesService: OrderHistoriesService,
  ) {}

  @Get()
  async getAll(): Promise<Order[]> {
    return this.ordersService.getAll();
  }

  @Get('status/:status')
  async getByStatus(@Param('status') status: string): Promise<Order[]> {
    return this.ordersService.getByStatus(status);
  }

  @Get(':id')
  async getById(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.getById(orderId);
  }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto);
  }

  @Patch(':id/status')
  async update(
    @Param('id') orderId: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.ordersService.update(
      orderId,
      updateOrderDto,
    );

    if (updateOrderDto.status === 'EN PROCESO') {
      await this.orderHistoriesService.create({
        orderId,
        event: 'Servicio iniciado',
        dateTime: new Date(),
      });
    } else if (updateOrderDto.status === 'FINALIZADO') {
      await this.orderHistoriesService.create({
        orderId,
        event: 'Servicio finalizado',
        dateTime: new Date(),
      });
    }

    return updatedOrder;
  }

  @Delete(':id')
  async delete(@Param('id') orderId: string): Promise<void> {
    await this.ordersService.delete(orderId);
  }
}
