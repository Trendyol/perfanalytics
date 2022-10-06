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
    const pathCount = await this.pageService.getCount(user);
    const domainCount = await this.domainService.getCount(user);

    return { pathCount, domainCount };
  }

  async getMetricsByDomain(user: User, domainId: string) {
    const pathCount = await this.pageService.getCount(user, domainId);

    return { pathCount };
  }
}
