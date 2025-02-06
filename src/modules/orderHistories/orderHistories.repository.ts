

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';  // Importar @InjectRepository
import { Repository } from 'typeorm';  // Importar Repository de TypeORM
import { OrderHistory } from './orderHistory.entity';  // Importar la entidad OrderHistory

@Injectable ()

export class OrdersHistoriesRepository {

  constructor (

    @InjectRepository (OrderHistory)

    private readonly orderHistoryRepository: Repository<OrderHistory>,  

  ) {}


  async create (orderHistoryData: Partial<OrderHistory>): Promise<OrderHistory> {

    const orderHistory = this.orderHistoryRepository.create (orderHistoryData);
    return this.orderHistoryRepository.save(orderHistory);

  }

  async getAll (): Promise<OrderHistory[]> {

    return this.orderHistoryRepository.find ();

  }

  async getById (orderId: string): Promise<OrderHistory[]> {

    return this.orderHistoryRepository.find ({ where: { order: { id: orderId } } });

  }    

}



