import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './Order.entity';
import { OrderStatus } from 'src/enum/orderstatus.enum';
import { CreateOrderDto } from 'src/dto/orders/createOrder.dto';
import { UpdateOrderDto } from 'src/dto/orders/updateOrder.dto';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
  ) {}

  async create(orderData: CreateOrderDto): Promise<Order> {
    const order = this.ordersRepository.create(orderData);
    return this.ordersRepository.save(order);
  }

  async getAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async getByEmail(clientEmail: string): Promise<Order[]> {
    return this.ordersRepository.find({ where: { clientEmail } });
  }

  async getByTechnId(assignedTechnicianId: string): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { assignedTechnician: { id: assignedTechnicianId } },
      relations: ['assignedTechnician'],
    });
  }

  async getByStatus(status: string): Promise<Order[]> {
    const orderStatus = status as OrderStatus;
    return this.ordersRepository.find({ where: { status: orderStatus } });
  }

  async getById(id: string): Promise<Order | null> {
    return this.ordersRepository.findOne({ where: { id } });
  }

  async update(id: string, updateData: UpdateOrderDto): Promise<Order | null> {
    const order = await this.getById(id);

    if (!order) {
      return null;
    }

    if (
      updateData.status &&
      Object.values(OrderStatus).includes(updateData.status)
    ) {
      order.status = updateData.status;
      return this.ordersRepository.save(order);
    }

    return order;
  }

  /* Este endpoint será editado para cambiar el estado de la order de "Activa" a "Inactiva".*/
  async inactiveDelete(id: string): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
