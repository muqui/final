import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository'; // Importamos el repositorio
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(createOrderDto);
  }

  async getAll(): Promise<Order[]> {
    return this.ordersRepository.getAll();
  }

  async getByEmail(clientEmail: string): Promise<Order[]> {
    return this.ordersRepository.getByEmail(clientEmail);
  }

  async getByTechnId(technId: string): Promise<Order[]> {
    return this.ordersRepository.getByTechnId(technId);
  }

  async getByStatus(status: string): Promise<Order[]> {
    return this.ordersRepository.getByStatus(status);
  }

  async getById(id: string): Promise<Order> {
    return this.ordersRepository.getById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    await this.ordersRepository.update(id, updateOrderDto);
    return this.getById(id);
  }

  async inactiveDelete(id: string): Promise<void> {
    return this.ordersRepository.inactiveDelete(id);
  }
}
