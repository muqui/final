import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "./notifications.repository";
import { CreateNotificationDto } from "src/dto/notification/notification.dto";

@Injectable()
export class NotificationService{
    constructor(private readonly notificationRepository: NotificationsRepository){}

    async create(createNotificationDto: CreateNotificationDto){
        return this.notificationRepository.create(createNotificationDto)
    }

    async findAll(){
        return this.notificationRepository.findAll()
    }

    async findByOrder(orderId: string){
        return this.notificationRepository.findByOrder(orderId)
    }

    async findOne(id: string){
        return this.notificationRepository.findOne(id)
    }

    async findByClientDni(dni){
        return this.notificationRepository.findByClientDni(dni)
    }

    async resendNotification(id: string){
        return this.notificationRepository.resendNotification(id)
    }

    async delete(id: string){
        return this.notificationRepository.delete(id)
    }

    async deleteByOrder(id: string){
        return this.notificationRepository.deleteByOrder(id)
    }
}