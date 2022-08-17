import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LighthousePayload } from './modules/lighthouse/dto/lighthouse.payload';
import { LighthouseService } from './modules/lighthouse/lighthouse.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly lighthouseService: LighthouseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('lh')
  async respondToLighthouseTopic(@Payload() payload: LighthousePayload) {
    return await this.lighthouseService.initLighthouse(payload.message);
  }
}
