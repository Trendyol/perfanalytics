import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LighthouseService } from './lighthouse.service';

@ApiTags('Lighthouse')
@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Post('message')
  async sendMessage(@Body() body) {
    const { topic, data, key } = body;

    return this.lighthouseService.sendMessage(topic, data, key);
  }
}
