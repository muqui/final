

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';  // Importamos el repositorio
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';
import { UpdateStatusDto } from '../../dto/orders/updateTechStatus.dto';
import { UpdateTechicalDataDto } from 'src/dto/orders/updateTechData.dto';

@Injectable ()

export class OrdersService {

  constructor (

    private readonly ordersRepository: OrdersRepository,
    private readonly usersRepository: UsersRepository,    

  ) {} 

  async getAllOrders (): Promise<Order []> {

    return this.ordersRepository.getAllOrders ();    

  }

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    return this.ordersRepository.getOrdersByClientEmail (clientEmail);

  }
  
  async getOrdersByTechnId (technId: string): Promise<Order []> {

    return this.ordersRepository.getOrdersByTechnId (technId);

  }    

  /*async getByStatus (status: string): Promise<Order []> {

    return this.ordersRepository.getByStatus (status);
  
  }*/

  async getOrderById (id: string): Promise<Order> {
   
    return this.ordersRepository.getOrderById (id);

  }

 /*async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {

    return this.ordersRepository.createOrder (createOrderDto);

  }*/

  async updateTechnicalData (id: string, updateTechnicalDataDto: UpdateTechicalDataDto): Promise<Order> {

    const order = await this.ordersRepository.getOrderById (id);
    if (!order) throw new NotFoundException (`Orden con ID ${id} no encontrada`);
    
    if (!order.assignedTechnician?.id) {

      throw new ForbiddenException ('La orden no tiene un técnico asignado o no se puede verificar.');

    }

    await this.ordersRepository.saveOrder (id, updateTechnicalDataDto);
    return this.ordersRepository.getOrderById (id);

  }      

  async updateOrderStatus (id: string, updateStatusDto: UpdateStatusDto): Promise<Order> {

    const order = await this.ordersRepository.getOrderById (id);
      
    if (!order) {

      throw new NotFoundException (`Orden con ID ${id} no encontrada`);

    }
      
    if (!order.assignedTechnician) {

      throw new ForbiddenException ('La orden no tiene un técnico asignado.');

    }      
   
    if (!order.assignedTechnician.id) {

      throw new ForbiddenException('No se puede verificar el técnico asignado.');

    }
      
    if (!order.statusHistory) {

      order.statusHistory = [];

    }
      
    order.statusHistory.push ({

      [updateStatusDto.status]: new Date ().toISOString ().replace ("T", " ").split (".") [0],

    });      

    return this.ordersRepository.updateOrderStatus (id, updateStatusDto.status, order.statusHistory);

  }          
 
  async inactiveDelete (id: string, { isActive }: UpdateOrderDto): Promise<{ message: string }> {

    const order = await this.ordersRepository.findOrderById (id);
    if (!order) throw new NotFoundException (`Orden con ID ${id} no encontrada.`);    

    if (order.isActive && isActive === false) {

      await this.ordersRepository.updateOrder (id, { isActive: false });
      return { message: `Orden con ID ${id} ha sido inactivada correctamente.` };

    }
    
    throw new BadRequestException (`No se puede reactivar una orden inactiva.`);

  }
  
}




