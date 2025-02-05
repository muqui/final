import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Evidence } from './evidences.entity';
import { EvidencesController } from './evidences.controller';
import { EvidencesService } from './evidences.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CloudinaryConfig } from 'src/Config/cloudinary';
import { Order } from '../orders/Order.entity';


@Module({
     imports: [TypeOrmModule.forFeature([Evidence, Order])],
      controllers: [EvidencesController],
      providers: [EvidencesService, CloudinaryService, CloudinaryConfig], 
})
export class EvidencesModule {}
