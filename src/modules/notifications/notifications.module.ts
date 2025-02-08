import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './Notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationService } from './notifications.service';
import { NotificationsRepository } from './notifications.repository';
import { Order } from '../orders/Order.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Order]), MailModule],
  controllers: [NotificationsController],
  providers: [NotificationService, NotificationsRepository],
})
export class NotificationsModule {}
