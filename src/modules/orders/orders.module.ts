import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';

import { OrderHistory } from '../orderHistories/orderHistory.entity';
import { Order } from './Order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistory, Order])],
  controllers: [OrdersController],
})
export class OrdersModule {}
