import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { GetMetricsQuery } from './etc/get-metrics-query';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getDashboard(@User() user, @Query() query: GetMetricsQuery) {
    const { domainId } = query;
    if (domainId) {
      // return await this.dashboardService.getMetricsByDomain(user, domainId);
    }
    return await this.dashboardService.getMetrics(user);
  }
}
