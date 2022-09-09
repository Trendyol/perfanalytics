import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAnalyticsParam } from './etc/get-analytics.param';
import { GetLighthouseQuery } from './etc/get-lighthouse.query';
import { LighthouseService } from './lighthouse.service';

@ApiTags('Lighthouse')
@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  @UseGuards(JwtGuard)
  async get(@User() user, @Query() query: GetLighthouseQuery) {
    const { startDate, endDate, pageId } = query;
    return await this.lighthouseService.get(user, startDate, endDate, pageId);
  }

  @Get('/analytics/:pageId')
  @UseGuards(JwtGuard)
  async getAnalytics(
    @User() user,
    @Query() query: GetLighthouseQuery,
    @Param() param: GetAnalyticsParam,
  ) {
    const { startDate, endDate } = query;
    const { pageId } = param;
    return await this.lighthouseService.getAnalytics(
      user,
      startDate,
      endDate,
      pageId,
    );
  }
}
