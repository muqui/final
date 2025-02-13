

import { Injectable } from '@nestjs/common';
import { OrdersHistoriesRepository } from './orderHistories.repository';  // Importamos el repositorio
import { CreateOrderHistoriesDto } from '../../dto/orderHistories/createOrderHistories.dto';
import { OrderHistory } from './orderHistory.entity';  // Importar la entidad OrderHistory

@Injectable ()
export class OrderHistoriesService {

  constructor (private readonly ordersHistoriesRepository: OrdersHistoriesRepository) {}
  
  async getAllOrderHistories (): Promise<OrderHistory []> {

    return await this.ordersHistoriesRepository.getAllOrderHistories (); 

  }

  async getOrderHistory (orderId: string): Promise<OrderHistory []> {

    return await this.ordersHistoriesRepository.getOrderHistory (orderId); 

  }
 
  async registerEvent (orderId: string, event: string): Promise<OrderHistory> {

    return await this.ordersHistoriesRepository.createAndSaveOrderEvent (orderId, event, new Date ());

  }

  async createOrderEvent (createOrderHistoryDto: CreateOrderHistoriesDto): Promise<OrderHistory> {

   const { orderId, event, createdAt } = createOrderHistoryDto;
  
   const finalCreatedAt = createdAt ?? new Date ();

   return await this.ordersHistoriesRepository.createAndSaveOrderEvent (orderId, event, finalCreatedAt);

  } 

}





  