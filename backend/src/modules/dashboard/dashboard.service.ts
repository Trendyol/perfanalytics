import { DomainService } from '@modules/domain/domain.service';
import { PageService } from '@modules/page/page.service';
import { User } from '@modules/user/etc/user.schema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  constructor(
    private readonly pageService: PageService,
    private readonly domainService: DomainService,
  ) {}

  async getMetrics(user: User) {
    const pageCount = await this.pageService.getCount(user);
    const domainCount = await this.domainService.getCount(user);

    return { pageCount, domainCount };
  }

  async getMetricsByDomain(user: User, domainId: string) {
    const pageCount = await this.pageService.getCount(user, domainId);

    return { pageCount };
  }
}
