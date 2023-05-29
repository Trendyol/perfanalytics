import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IDataService } from '@core/data/services/data.service';
import { MongoGenericRepository } from './mongo.repository';
import { Domain, DomainDocument } from './schemas/domain.schema';
import { Tag, TagDocument } from './schemas/tag.schema';
import { User, UserDocument } from './schemas/user.schema';
import { Report, ReportDocument } from './schemas/report.schema';
import { Page, PageDocument } from './schemas/page.schema';

@Injectable()
export class MongoDataService implements IDataService, OnApplicationBootstrap {
  connection: any;
  domains: MongoGenericRepository<Domain>;
  users: MongoGenericRepository<User>;
  reports: MongoGenericRepository<Report>;
  pages: MongoGenericRepository<Page>;
  tags: MongoGenericRepository<Tag>;

  constructor(
    @InjectModel(Domain.name)
    private DomainModel: Model<DomainDocument>,

    @InjectModel(Tag.name)
    private TagModel: Model<TagDocument>,

    @InjectModel(Page.name)
    private PageModel: Model<PageDocument>,

    @InjectModel(User.name)
    private UserModel: Model<UserDocument>,

    @InjectModel(Report.name)
    private ReportModel: Model<ReportDocument>,
  ) {}

  onApplicationBootstrap() {
    this.domains = new MongoGenericRepository<Domain>(this.DomainModel);
    this.pages = new MongoGenericRepository<Page>(this.PageModel);
    this.users = new MongoGenericRepository<User>(this.UserModel);
    this.reports = new MongoGenericRepository<Report>(this.ReportModel);
    this.tags = new MongoGenericRepository<Tag>(this.TagModel);
  }
}
