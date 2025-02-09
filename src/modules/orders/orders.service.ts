


import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';  // Importamos el repositorio
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersRepository.create(createOrderDto);
  }

  async getAllOrders (): Promise<Order []> {

    return this.ordersRepository.getAllOrders ();    

  }

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    return this.ordersRepository.getOrdersByClientEmail (clientEmail);

  }
  
  async getOrdersByTechnId (technId: string): Promise<Order []> {

    return this.ordersRepository.getOrdersByTechnId (technId);

  }    

  async getByStatus (status: string): Promise<Order []> {

    return this.ordersRepository.getByStatus (status);
  
  }

  async getOrderById (id: string): Promise<Order> {
    await this.ordersRepository.update (id, updateOrderDto);
    return this.ordersRepository.getOrderById(id);

  }

      async inactiveDelete(id: string, { isActive }: UpdateOrderDto): Promise<{ message: string }> {
      const order = await this.ordersRepository.findOrderById(id);
      if (!order) throw new NotFoundException(`Orden con ID ${id} no encontrada.`);
      if (!isActive && !order.isActive) throw new BadRequestException(`La orden ya está inactiva.`);
    
      await this.ordersRepository.update(id, { isActive });
    
      return { message: `Orden con ID ${id} ha sido ${isActive ? 'activada' : 'inactivada'} correctamente` };
    }
    
  
}




