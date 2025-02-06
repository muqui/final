

import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';  // Importamos el repositorio
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { UpdateOrderDto } from '../../dto/orders/UpdateOrder.dto';
import { Order } from './order.entity';

@Injectable ()

export class OrdersService {

  constructor (private readonly ordersRepository: OrdersRepository) {}

  async create (createOrderDto: CreateOrderDto): Promise<Order> {

    return this.ordersRepository.create (createOrderDto);

  }

  async getAll (): Promise<Order[]> {

    return this.ordersRepository.getAll ();

  }

  async getById (id: string): Promise<Order> {

    return this.ordersRepository.getById (id);

  }

  async getByStatus (status: string): Promise<Order []> {

    return this.ordersRepository.getByStatus (status);

  }

  async update (id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {

    await this.ordersRepository.update (id, updateOrderDto);
    return this.getById(id);

  }

  async delete (id: string): Promise<void> {

    return this.ordersRepository.delete (id);

  }  

}


  