import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHistory } from './OrderHistory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHistory])],
})
export class OrderHistoriesModule {}
