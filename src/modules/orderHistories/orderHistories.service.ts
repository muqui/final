

import { Injectable } from '@nestjs/common';
import { OrdersHistoriesRepository } from './orderHistories.repository';  // Importamos el repositorio
import { CreateOrderHistoriesDto } from '../../dto/orderHistories/createOrderHistories.dto';
import { OrderHistory } from './orderHistory.entity';  // Importar la entidad OrderHistory

@Injectable ()

export class OrderHistoriesService {

  constructor (private readonly ordersHistoriesRepository: OrdersHistoriesRepository) {}

  async create (createOrderHistoryDto: CreateOrderHistoriesDto): Promise<OrderHistory> {

    return this.ordersHistoriesRepository.create (createOrderHistoryDto);

  }

  async getAll (): Promise<OrderHistory []> {

    return this.ordersHistoriesRepository.getAll ();

  }

  async getById (orderId: string): Promise<OrderHistory []> {

    return this.ordersHistoriesRepository.getById (orderId);

  }
  
}




  