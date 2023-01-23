import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @UseGuards(JwtGuard)
  @Get(':reportId')
  async get(@User() user, @Param('reportId') reportId: string) {
    return this.reportService.get(user._id, reportId);
  }

  @UseGuards(JwtGuard)
  @Get('run/:pageId')
  async run(@User() user, @Param('pageId') pageId: string) {
    return this.reportService.create(user._id, pageId);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAll(
    @User() user,
    @Query('pageId') pageId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.reportService.getAll(user, startDate, endDate, pageId);
  }

  @Get('token/generate')
  @UseGuards(JwtGuard)
  async getRunToken(@User() user, @Query('pageId') pageId: string) {
    return this.reportService.createReportToken(user, pageId);
  }

  @Get('run/token/:token')
  async runToken(
    @Query('name') name: string,
    @Query('link') link: string,
    @Param('token') token: string,
  ) {
    return this.reportService.verifyReportToken(token, { name, link });
  }
}
