import config from '@core/config';
import { IDataService } from '@core/data/services/data.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDataService } from './mongo.service';
import { Report, ReportSchema } from './schemas/report.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    MongooseModule.forRoot(config.mongo.uri),
  ],
  providers: [
    {
      provide: IDataService,
      useClass: MongoDataService,
    },
  ],
  exports: [IDataService],
})
export class MongoModule {}
