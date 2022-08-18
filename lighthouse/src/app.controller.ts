import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LighthousePayload } from './modules/lighthouse/dto/lighthouse.payload';
import { LighthouseService } from './modules/lighthouse/lighthouse.service';

@Controller()
export class AppController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @MessagePattern('lh')
  async respondToLighthouseTopic(@Payload() payload: LighthousePayload) {
    return await this.lighthouseService.initLighthouse(payload.message);
  }
}
