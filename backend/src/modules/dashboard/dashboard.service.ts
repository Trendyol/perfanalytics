import { DomainService } from '@modules/domain/domain.service';
import { PageService } from '@modules/page/page.service';
import { ReportService } from '@modules/report/report.service';
import { UserDto } from '@modules/user/dtos/user.dto';

import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(
    private readonly pageService: PageService,
    private readonly domainService: DomainService,
    private readonly reportService: ReportService,
  ) {}

  async getCounts(user: UserDto) {
    const pageCount = await this.pageService.count(user);
    const domainCount = await this.domainService.count(user);
    const reportCount = await this.reportService.count(user);

    return { pageCount, domainCount, reportCount };
  }

  async getDomainCounts(user: UserDto, domainId: string) {
    const pageCount = await this.pageService.count(user, domainId);
    const reportCount = await this.reportService.count(user);

    return { pageCount, reportCount };
  }
}
