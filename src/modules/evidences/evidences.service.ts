import { Injectable } from '@nestjs/common';
import { CreateEvidenceDto } from 'src/dto/evidences/createEvidence.dto';
import { Evidence } from './evidences.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Injectable()
export class EvidencesService {



  
  
    constructor(
        @InjectRepository(Evidence) private evidenceRepository: Repository<Evidence>,
                                    private readonly cloudinaryService: CloudinaryService
    ){}


    async createEvidenceWithImage(createEvidenceDto: CreateEvidenceDto, file: Express.Multer.File) {
     // Si `createEvidenceDto` es un string JSON, parsealo
     const jsonString = JSON.stringify(createEvidenceDto);

     const parsedObj = JSON.parse(jsonString);
     const createEvidenceDtoR = JSON.parse(parsedObj.createEvidenceDto);

     console.log(createEvidenceDtoR.orderId)

      const saveFile = await this.cloudinaryService.upladImage(file); //subimos la imagen
      //const saveFile = "http://ciisfjisjfisfjdifjisjfd.jpg"
      //createEvidenceDtoR.fileUrl = saveFile;
      createEvidenceDtoR.fileUrl = saveFile.secure_url;

      return this.createEvidence(createEvidenceDtoR);
      

  }

  createEvidence(createEvidenceDto: CreateEvidenceDto) {
    console.log("desde guardar: ")
   console.log(createEvidenceDto)


   return this.evidenceRepository.save(createEvidenceDto);

  }

  getEvidences() {
    return this.evidenceRepository.find();
  }

 async getEvidencesByOrderId(id: string) {
    return await this.evidenceRepository.findOne({ where: { id } });
  }

}
