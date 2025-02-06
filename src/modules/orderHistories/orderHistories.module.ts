

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistoriesController } from './orderHistories.controller';
import { OrderHistoriesService } from './orderHistories.service';
import { OrderHistory } from './orderHistory.entity';
import { OrdersHistoriesRepository } from './orderHistories.repository'; // Esto está bien

@Module ({

  imports: [TypeOrmModule.forFeature ([OrderHistory])],  
  controllers: [OrderHistoriesController],

  providers: [

    OrderHistoriesService,
    OrdersHistoriesRepository, 

  ],

  exports: [OrderHistoriesService],

})

export class OrderHistoriesModule {}

