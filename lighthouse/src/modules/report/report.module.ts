import { Module } from '@nestjs/common';
import { DataModule } from '../providers/database/data/data.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [DataModule],
  providers: [ReportService],
  exports: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
