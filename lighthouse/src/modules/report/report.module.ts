import { Module } from '@nestjs/common';
import { DataModule } from '../providers/database/data/data.module';
import { StorageModule } from '../providers/storage/storage/storage.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [DataModule, StorageModule],
  providers: [ReportService],
  exports: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
