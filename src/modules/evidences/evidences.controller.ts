import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EvidencesService } from './evidences.service';
import { CreateEvidenceDto } from 'src/dto/evidences/createEvidence.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}

  @Post('img')
  async createEvidenceWittoutImage(
    @Body() createEvidenceDto: CreateEvidenceDto,
  ) {
    return this.evidencesService.createEvidence(createEvidenceDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createEvidence(
    @Body() createEvidenceDto: CreateEvidenceDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.evidencesService.createEvidenceWithImage(createEvidenceDto, file);
  }

  @Get()
  getEvidences(){
      return this.evidencesService.getEvidences();
  }

  @Get(':orderId')
  getEvidencesByOrderId(@Param('orderId') orderId: string){
     
      return this.evidencesService.getEvidencesByOrderId(orderId)
      
  }
}
