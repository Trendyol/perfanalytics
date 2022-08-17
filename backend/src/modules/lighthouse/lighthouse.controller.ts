import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LighthouseService } from './lighthouse.service';

@ApiTags('Lighthouse')
@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}
}
