import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './Config/typeorm';
import { EvidencesModule } from './modules/evidences/evidences.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    UsersModule,
    OrdersModule,
    EvidencesModule,
    NotificationsModule,
    MailModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
