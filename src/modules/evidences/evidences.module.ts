import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from './Evidence.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Evidence])],
})
export class EvidencesModule {}
