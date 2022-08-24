import { DomainModule } from '@modules/domain/domain.module';
import { PageModule } from '@modules/page/page.module';
import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [PageModule, DomainModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
