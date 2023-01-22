import { Module } from '@nestjs/common';
import { DataModule } from './modules/providers/database/data/data.module';
import { ReportModule } from './modules/report/report.module';

@Module({
  imports: [DataModule, ReportModule],
})
export class AppModule {}
