

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';
import { OrderStatus } from 'src/enum/orderstatus.enum';
import { CreateOrderDto } from 'src/dto/orders/createOrder.dto';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';
import { UpdateResult } from 'typeorm';


@Injectable ()

export class OrdersRepository {

  constructor (

    @InjectRepository (Order)
    private readonly ordersRepository: Repository<Order>,  

  ) {}

  async create (orderData: CreateOrderDto): Promise<Order> {

    const order = this.ordersRepository.create (orderData);
    return this.ordersRepository.save (order);

  }

  async getAllOrders (): Promise<Order []> {

    return this.ordersRepository.find ();

  }

  async getOrdersByClientEmail (clientEmail: string): Promise<Order []> {

    return this.ordersRepository.find ({ where: { clientEmail } });

  }

  async getOrdersByTechnId (assignedTechnicianId: string): Promise<Order []> {

    return this.ordersRepository.find ({

      where: { assignedTechnician: { id: assignedTechnicianId } }, 
      relations: ['assignedTechnician'], 

    });

  }  

  async getByStatus(status: string): Promise<Order []> {

    const orderStatus = status as OrderStatus; 
    return this.ordersRepository.find ({ where: { status: orderStatus } });

  }   

  async getOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({ where: { id } });

  }  
 
 
    async update(id: string, updateData: UpdateOrderDto): Promise<Order | null> {
      const order = await this.getOrderById(id);
      if (!order) return null;  
    
      const updatedOrder = { ...order, ...updateData };
      return this.ordersRepository.save(updatedOrder);
    }
    
    

  async findOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({ where: { id } });
    
  }

  /* Este endpoint será utilizado para cambiar el estado de la order de "Activa" a "Inactiva".*/
  
  async inactiveDelete(id: string, isActive: boolean): Promise<Order> {
    await this.update(id, { isActive });
    return this.findOrderById(id);
  }
  
     

}
  






