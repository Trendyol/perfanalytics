import { DomainService } from '@modules/domain/domain.service';
import { PageService } from '@modules/page/page.service';
import { LighthouseService } from '@modules/lighthouse/lighthouse.service';
import { User } from '@modules/user/etc/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(
    private readonly pageService: PageService,
    private readonly domainService: DomainService,
    private readonly lighthouseService: LighthouseService,
  ) {}

  async getMetrics(user: User) {
    const pageCount = await this.pageService.getCount(user);
    const domainCount = await this.domainService.getCount(user);
    const lighthouseCount = await this.lighthouseService.getCount(user);
    return { pageCount, domainCount, lighthouseCount };
  }

  async getMetricsByDomain(user: User, domainId: string) {
    const pageCount = await this.pageService.getCount(user, domainId);
    const lighthouseCount = await this.lighthouseService.getCount(
      user,
      domainId,
    );

    return { pageCount, lighthouseCount };
  }
}
