import {
  DomainEntity,
  PageEntity,
  ReportEntity,
  TagEntity,
  UserEntity,
} from '@core/data/entities';
import { IDataService } from '@core/data/services/data.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Ottoman } from 'ottoman';

import { Document, OttomanGenericRepository } from './ottoman.repository';
import config from '@config';
import { userSchema } from './schemas/user.schema';
import { domainSchema } from './schemas/domain.schema';
import { pageSchema } from './schemas/page.schema';
import { reportSchema } from './schemas/report.schema';
import { tagSchema } from './schemas/tag.schema';

@Injectable()
export class OttomanDataService implements IDataService, OnModuleInit {
  connection: Ottoman;
  users: OttomanGenericRepository<UserEntity>;
  domains: OttomanGenericRepository<DomainEntity>;
  pages: OttomanGenericRepository<PageEntity>;
  reports: OttomanGenericRepository<ReportEntity>;
  tags: OttomanGenericRepository<TagEntity>;

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

    const userModel = ottoman.model<UserEntity, Document<UserEntity>>(
      'user',
      userSchema,
      { idKey: '_id' },
    );
    this.users = new OttomanGenericRepository<UserEntity>(
      userModel,
      this.connection,
    );

    const domainModel = ottoman.model<DomainEntity, Document<DomainEntity>>(
      'domain',
      domainSchema,
      { idKey: '_id' },
    );
    this.domains = new OttomanGenericRepository<DomainEntity>(
      domainModel,
      this.connection,
    );

    const pageModel = ottoman.model<PageEntity, Document<PageEntity>>(
      'page',
      pageSchema,
      { idKey: '_id' },
    );
    this.pages = new OttomanGenericRepository<PageEntity>(
      pageModel,
      this.connection,
    );

    const reportModel = ottoman.model<ReportEntity, Document<ReportEntity>>(
      'report',
      reportSchema,
      { idKey: '_id' },
    );
    this.reports = new OttomanGenericRepository<ReportEntity>(
      reportModel,
      this.connection,
    );

    const tagModel = ottoman.model<TagEntity, Document<TagEntity>>(
      'tag',
      tagSchema,
      { idKey: '_id' },
    );
    this.tags = new OttomanGenericRepository<TagEntity>(
      tagModel,
      this.connection,
    );
  }
}
