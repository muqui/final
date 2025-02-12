

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';  // Importamos el repositorio
import { UsersRepository } from '../users/users.repository';
import { CreateOrderDto } from '../../dto/orders/createOrder.dto';
import { Order } from './Order.entity';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';
import { UpdateStatusDto } from '../../dto/orders/updateTechStatus.dto';
import { UpdateTechicalDataDto } from 'src/dto/orders/updateTechData.dto';
import { EquipmentType } from 'src/enum/equipmentype.enum';
import { OrderStatus } from 'src/enum/orderstatus.enum';
import { User } from '../users/User.entity';
import { Role } from 'src/enum/Role.enum';

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
    
  async createOrder (createOrderDto: CreateOrderDto): Promise<Order> {

    const { assignedTechnicianId, userId, clientId } = createOrderDto;             
     
        const client = await this.usersRepository.findByRole(clientId, Role.CLIENT);
        if (!client) {
          throw new NotFoundException('Cliente no encontrado.');
        }
        
        const assignedTechnician = await this.usersRepository.findByRole(assignedTechnicianId, Role.TECHN);
        if (!assignedTechnician) {
          throw new NotFoundException('Técnico no encontrado.');
        }
        
        const admin = await this.usersRepository.findByRole(userId, Role.ADMIN);
        if (!admin) {
          throw new NotFoundException('El usuario que crea la orden debe ser un administrador.');
        }
          

    const defaultUser: User = {

      id: "N/A",
      name: "No asignado",
      email: "no-asignado@example.com",
      dni: 99999999,
      password: "default",
      phone: "000000000",
      role: "unknown",
      createdAt: new Date (),
      order: [], 

    };

    const validateOrderDto: CreateOrderDto = {

      userId: admin?.id ?? "N/A", 
      assignedTechnicianId: assignedTechnician?.id ?? "N/A", 
      clientId: client?.id ?? "N/A", 

    };

    const orderData: Partial<Order> = {

      clientEmail: client?.email ?? "No asignado", 
      clientDni: client?.dni ?? 99999999, 
      assignedTechnician: assignedTechnician ?? defaultUser, 
      user: admin ?? defaultUser, 
      equipmentType: EquipmentType.EQUIPO, 
      imei: "000000000000000", 
      description: "[Editar ...]", 
      status: OrderStatus.ACTUALIZAR, 
      isActive: true, 
      statusHistory: [], 

    };
        
    const newOrder = await this.ordersRepository.createOrder(orderData);
    return await this.ordersRepository.saveOrder1(newOrder);

    }          

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



