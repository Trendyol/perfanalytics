import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetLighthouseQuery } from './etc/get-lighthouse.query';
import { LighthouseService } from './lighthouse.service';

@ApiTags('Lighthouse')
@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  @UseGuards(JwtGuard)
  async get(@User() user, @Query() query: GetLighthouseQuery) {
    const { startDate, endDate } = query;
    return await this.lighthouseService.get(user, startDate, endDate);
  }
}
