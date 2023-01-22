import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataService } from '@core/data/services/data.service';
import { MongoGenericRepository } from './mongo.repository';
import { Report, ReportDocument } from './schemas/report.schema';

@Injectable()
export class MongoDataService implements IDataService, OnApplicationBootstrap {
  connection: any;
  reports: MongoGenericRepository<Report>;

  constructor(
    @InjectModel(Report.name) private ReportModel: Model<ReportDocument>,
  ) {}

  onApplicationBootstrap() {
    this.reports = new MongoGenericRepository<Report>(this.ReportModel);
  }
}
