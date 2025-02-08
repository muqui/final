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
import { UpdateOrderDto } from '../../dto/orders/updateOrder.dto';
import { OrderStatus } from '../../enum/orderstatus.enum';

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


  @Get('email/:clientEmail')
  async getByEmail(
    @Param('clientEmail') clientEmail: string,
  ): Promise<Order[]> {
    return this.ordersService.getByEmail(clientEmail);
  }


  @Get ('technician/:technId')
  async getByTechnId (@Param ('technId') technId: string): Promise<Order []> {
    return this.ordersService.getByTechnId (technId);
  }

  @Get ('status/:status')

  async getByStatus (@Param ('status') status: OrderStatus): Promise<Order []> {

    return this.ordersService.getByStatus (status);


  }

  @Get(':id')
  async getById(@Param('id') orderId: string): Promise<Order> {
    return this.ordersService.getById(orderId);
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

          dateTime: new Date (),


        });
      }
    }

    return updatedOrder;
  }


  @Delete (':id')
  async delete (@Param ('id') orderId: string): Promise<void> {

    await this.ordersService.inactiveDelete (orderId);


  }
}
