

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Order } from './Order.entity';
import { CreateOrderDto } from 'src/dto/orders/createOrder.dto';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';
import { UpdateStatusDto } from 'src/dto/orders/updateTechStatus.dto';
import { OrderStatus } from 'src/enum/orderstatus.enum';
import { UpdateTechicalDataDto } from '../../dto/orders/updateTechData.dto';

@Injectable ()

export class OrdersRepository  {

  constructor (private readonly entityManager: EntityManager,

    @InjectRepository (Order)
    private readonly ordersRepository: Repository<Order>,


  ) {} 

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

  /*async getByStatus (status: string): Promise<Order []> {

    const orderStatus = status as OrderStatus;
    return this.ordersRepository.find ({ where: { status: orderStatus } });

  }*/

  async getOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({

      where: { id }, 
      relations: ['assignedTechnician'], 

    });
   
  }    

  /*async createOrder (orderData: CreateOrderDto): Promise<Order> {

    const order = this.create (orderData);
    return this.ordersRepository.save (order);

  }*/

  async createOrder (orderData: Partial<Order>): Promise<Order> {

    const order = this.entityManager.create (Order, orderData); 
    return order;

  }
  
  async saveOrder1 (order: Order): Promise<Order> {

    return await this.entityManager.save (order);

  }  
    
  async updateOrderStatus (

    id: string, 
    status: OrderStatus, 
    statusHistory: { [key: string]: string } []

  ): Promise<Order | null> {

    const order = await this.getOrderById (id);
    if (!order) return null;
  
    await this.ordersRepository.update (id, { status, statusHistory });  
    return this.getOrderById (id);

  }       

  async findOrderById (id: string): Promise<Order | null> {

    return this.ordersRepository.findOne ({ where: { id } });
    
  }

  async saveOrder (id: string, updateTechnicalDataDto: UpdateTechicalDataDto): Promise<Order> {

    await this.ordersRepository.update (id, updateTechnicalDataDto);
    return this.ordersRepository.findOne ({ where: { id } });  
  
  }   
  
  async updateOrder (id: string, updateData: Partial<Order>): Promise<Order> {

    await this.ordersRepository.update (id, updateData);
    return this.ordersRepository.findOne ({ where: { id } });

  }

  async findOne(id: string): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id } });
  }
  
  
}







