import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notification } from "./Notification.entity";
import { Repository } from "typeorm";
import { Order } from "../orders/Order.entity";
import { CreateNotificationDto } from "src/dto/notification/notification.dto";

@Injectable() 
export class NotificationsRepository {
    constructor(@InjectRepository(Notification) private notificationRepository: Repository<Notification>,
    @InjectRepository(Order) private orderRepository: Repository<Order>){}

    async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
        const order = await this.orderRepository.findOne({ where: { id: createNotificationDto.orderId }, relations:{} });
    
        if (!order) {
          throw new NotFoundException   ('La orden no existe');
        }
    
        const notification = this.notificationRepository.create({
          message: createNotificationDto.message,
          order,
        });
    
        await this.notificationRepository.save(notification);
        return notification;
      }
    
      async findAll(): Promise<Notification[]> {
        const  notifications= await this.notificationRepository.find({ relations: ['order'] });
        if(!notifications){
            throw new NotFoundException('notifications not found')
        }
        return notifications
      }

      async findOne(id: string): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({ where: { id }, relations: ['order'] });
        if (!notification) {
          throw new NotFoundException('Notificación no encontrada');
        }
        return notification;
      }
    
      async findByOrder(orderId: string): Promise<Notification[]> {
        const notificationByOrder= await this.notificationRepository.find({ where: { order: { id: orderId } }, relations: ['order'] });
        if(!notificationByOrder){
            throw new NotFoundException('notification by orderId not found')
        }
        return notificationByOrder    
      }

      async findByClientDni(dni: string): Promise<Notification[]> {
        const notificationByDni= await this.notificationRepository.createQueryBuilder('notification')
          .innerJoin('notification.order', 'order')
          .where('order.clientDni = :dni', { dni })
          .getMany();
          if(!notificationByDni){
            throw new NotFoundException('notification by dni not found')
          }
          return notificationByDni
      }
    
      async resendNotification(id: string): Promise<string> {
        const notification = await this.findOne(id);
        if (!notification) {
          throw new NotFoundException('Notification not found');
        }
    
        // Simulación de reenvío
        console.log(`Reenviando notificación: ${notification.message} al cliente`);
    
        return `Notificación reenviada con éxito al cliente.`;
      }
    
      async delete(id: string): Promise<void> {
        const result = await this.notificationRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException('notification not found');
        }
      }
    
      async deleteByOrder(orderId: string): Promise<void> {
        const result= await this.notificationRepository.delete({ order: { id: orderId } });
        if(result.affected===0){
            throw new NotFoundException('notification by orderID not found')
        }
      }

}