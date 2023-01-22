import { DomainModule } from '@modules/domain/domain.module';
import { PageModule } from '@modules/page/page.module';
import { DataModule } from '@modules/providers/database/data/data.module';
import { ReportModule } from '@modules/report/report.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PageModule, DomainModule, ReportModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
