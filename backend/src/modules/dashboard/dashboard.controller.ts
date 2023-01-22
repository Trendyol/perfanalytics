import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';

@ApiTags('Dashboard')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getCounts(@User() user, @Query('domainId') domainId: string) {
    if (domainId) {
      return await this.dashboardService.getDomainCounts(user, domainId);
    }
    return await this.dashboardService.getCounts(user);
  }
}
