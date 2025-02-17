import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoriesController } from './orderHistories.controller';
import { OrderHistoriesService } from './orderHistories.service';
import { OrderHistory } from './orderHistory.entity';
import { OrdersHistoriesRepository } from './orderHistories.repository';
import { OrdersModule } from '../orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderHistory]),

    forwardRef(() => OrdersModule),
  ],

  controllers: [OrderHistoriesController],

  providers: [OrderHistoriesService, OrdersHistoriesRepository],

  exports: [TypeOrmModule, OrderHistoriesService],
})
export class OrderHistoriesModule {}
