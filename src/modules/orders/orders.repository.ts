

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable ()

export class OrdersRepository {

  constructor (

    @InjectRepository (Order)
    private readonly ordersRepository: Repository<Order>,  

  ) {}

  async create (orderData: Partial<Order>): Promise<Order> {

    const order = this.ordersRepository.create (orderData);
    return this.ordersRepository.save (order);

  }

  async getAll (): Promise<Order []> {

    return this.ordersRepository.find ();

  }

  async getById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({ where: { id } });

  }

  async getByStatus (status: string): Promise<Order []> {

    return this.ordersRepository.find ({ where: { status } });

  }

  async update (id: string, updateData: Partial<Order>): Promise<Order> {

    await this.ordersRepository.update (id, updateData);
    return this.getById (id);  

  }

  async delete (id: string): Promise<void> {

    await this.ordersRepository.delete(id);

  }
  
}





