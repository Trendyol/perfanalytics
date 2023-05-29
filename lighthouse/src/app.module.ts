import { Module } from '@nestjs/common';
import { DataModule } from './modules/providers/database/data/data.module';
import { ReportModule } from './modules/report/report.module';
import { CdnModule } from './modules/providers/storage/cdn/cdn.module';

@Module({
  imports: [DataModule, ReportModule, CdnModule],
})
export class AppModule {}
