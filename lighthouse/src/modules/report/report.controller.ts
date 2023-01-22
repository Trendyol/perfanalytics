import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ReportEvent } from './events/report.event';
import { ReportService } from './report.service';

@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @EventPattern('report')
  async handleReport(@Payload() reportEvent: ReportEvent) {
    return await this.reportService.createReport(reportEvent);
  }
}
