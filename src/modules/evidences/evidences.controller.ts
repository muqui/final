import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { EvidencesService } from './evidences.service';
import { CreateEvidenceDto } from 'src/dto/evidences/createEvidence.dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('evidences')
export class EvidencesController {
  constructor(private readonly evidencesService: EvidencesService) {}



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

  @Get(':id')
  getEvidencesByOrderId(@Param('id') id: string){
     
      return this.evidencesService.getEvidencesById(id)
      
  }

  @Delete(':id')
  async deleteEvidence(@Param('id') id: string) {
    return this.evidencesService.deleteEvidence(id);
  }
}
