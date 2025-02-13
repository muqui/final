

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderHistory } from './orderHistory.entity';

@Injectable ()

export class OrdersHistoriesRepository {
  constructor (

    @InjectRepository (OrderHistory)

    private readonly orderHistoryRepository: Repository<OrderHistory>, 

  ) {}
  
  async getAllOrderHistories (): Promise<OrderHistory []> {

    return await this.orderHistoryRepository.find ();

  }

  async getOrderHistory (orderId: string): Promise<OrderHistory []> {

    return await this.orderHistoryRepository.find ({

      where: { order: { id: orderId } },
      order: { createdAt: 'ASC' },

    });

  }

  async createAndSaveOrderEvent (orderId: string, event: string, createdAt: Date): Promise<OrderHistory> {

  const orderHistory = await this.createOrder (orderId, event, createdAt); 
  return await this.saveOrder (orderHistory);

  }

  async createOrder (orderId: string, event: string, createdAt: Date): Promise<OrderHistory> {

    return this.orderHistoryRepository.create ({

    order: { id: orderId }, 
    event,
    createdAt,

    });

  }

  async saveOrder (orderHistory: OrderHistory): Promise<OrderHistory> {

    return await this.orderHistoryRepository.save (orderHistory);

  }

}




