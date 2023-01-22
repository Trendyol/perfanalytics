import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IDataService } from '@core/data/services/data.service';
import { KafkaService } from '@modules/providers/kafka/kafka.service';
import { ReportEvent } from './events/report.event';
import { PageService } from '@modules/page/page.service';
import { CreateReportDto } from './dtos/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly dataService: IDataService,
    private readonly pageService: PageService,
    private readonly kafkaService: KafkaService,
  ) {}
  emitReportEvent(reportEvent: ReportEvent) {
    this.kafkaService.emit('report', reportEvent);
  }

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleSchedule() {
    const pages = await this.pageService.getAll();
    pages.forEach(({ _id, owner, domain, device, url }) => {
      this.emitReportEvent(new ReportEvent(_id, owner, domain, device, url));
    });
  }

  async create(user, pageId: string) {
    const page = await this.pageService.get(user, pageId);

    const reportEvent = new ReportEvent(
      page._id,
      page.owner,
      page.domain,
      page.device,
      page.url,
    );
    return this.emitReportEvent(reportEvent);
  }
  async getAll(user, startDate: string, endDate: string, pageId: string) {
    const query = {
      owner: user._id,
      page: pageId,
      createdAt: { $gte: startDate, $lte: endDate },
    };

    return this.dataService.reports.find(query);
  }

  // getCount(user: User, domainId?: string) {
  //   return this.lighthouseModel.countDocuments({
  //     owner: user,
  //     ...(domainId && { domain: domainId }),
  //   });
  // }
}
