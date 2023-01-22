import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IDataService } from '@core/data/services/data.service';
import { KafkaService } from '@modules/providers/kafka/kafka.service';
import { ReportEvent } from './events/report.event';
import { PageService } from '@modules/page/page.service';
import { CreateReportDto } from './dtos/create-report.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './dtos/payload.dto';

@Injectable()
export class ReportService {
  constructor(
    private readonly dataService: IDataService,
    private readonly pageService: PageService,
    private readonly kafkaService: KafkaService,
    private readonly jwtService: JwtService,
  ) {}
  emitReportEvent(reportEvent: ReportEvent) {
    this.kafkaService.emit('report', reportEvent);
  }

  // @Cron(CronExpression.EVERY_10_HOURS)
  async handleSchedule() {
    const pages = await this.pageService.getAll();
    pages.forEach(({ _id, owner, domain, device, url }) => {
      this.emitReportEvent(new ReportEvent(_id, owner, domain, device, url));
    });
  }

  async create(userId: string, pageId: string, payload?: Payload) {
    const page = await this.pageService.get(userId, pageId);

    const reportEvent = new ReportEvent(
      page._id,
      page.owner,
      page.domain,
      page.device,
      page.url,
      payload,
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

  count(user: UserDto, domainId?: string) {
    return this.dataService.reports.count({
      owner: user._id,
      ...(domainId && { domain: domainId }),
    });
  }

  createReportToken(user: UserDto, pageId: string) {
    const token = this.jwtService.sign({ iss: user._id, pageId });
    return token;
  }

  verifyReportToken(token: string, payload: Payload) {
    try {
      const { iss, pageId } = this.jwtService.verify(token);
      this.create(iss, pageId, payload);
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
