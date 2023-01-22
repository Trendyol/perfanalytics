import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiTags } from '@nestjs/swagger';
import { CreateReportDto } from './dtos/create-report.dto';
import { Payload } from './dtos/payload.dto';
import { ReportEvent } from './events/report.event';
import { ReportService } from './report.service';

@ApiTags('Report')
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

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

  @Get('token')
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
