import { ReportEntity } from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repository';
import config from '@config';
import { reportSchema } from './schemas/report.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  connection: Ottoman;
  reports: OttomanGenericRepository<ReportEntity>;

  async onModuleInit() {
    const ottoman = new Ottoman({
      collectionName: '_default',
      modelKey: 'type',
    });

    const connectionString = config.couchbase.connectionString;
    const bucketName = config.couchbase.bucketName;
    const username = config.couchbase.username;
    const password = config.couchbase.password;

    this.connection = await ottoman.connect({
      connectionString,
      bucketName,
      username,
      password,
    });

    const reportModel = ottoman.model<ReportEntity, Document<ReportEntity>>(
      'report',
      reportSchema,
      { idKey: '_id' },
    );
    this.reports = new OttomanGenericRepository<ReportEntity>(
      reportModel,
      this.connection,
    );
  }
}
