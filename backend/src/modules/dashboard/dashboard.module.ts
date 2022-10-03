import { DomainModule } from '@modules/domain/domain.module';
import { LighthouseModule } from '@modules/lighthouse/lighthouse.module';
import { PageModule } from '@modules/page/page.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PageModule, DomainModule, LighthouseModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
