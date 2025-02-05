import { Controller } from '@nestjs/common';
import { evidencesService } from './evidences.service';

@Controller('evidences')
export class evidencesController {
  constructor(private readonly evidencesService: evidencesService) {}
}
