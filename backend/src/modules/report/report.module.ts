import config from '@core/config';
import { PageModule } from '@modules/page/page.module';
import { DataModule } from '@modules/providers/database/data/data.module';
import { KafkaModule } from '@modules/providers/kafka/kafka.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  imports: [
    JwtModule.register({
      secret: config.reportTokenSecret,
    }),
    ScheduleModule.forRoot(),
    KafkaModule,
    DataModule,
    PageModule,
  ],
  providers: [ReportService],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportModule {}
