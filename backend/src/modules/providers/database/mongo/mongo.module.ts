import config from '@core/config';
import { IDataService } from '@core/data/services/data.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoDataService } from './mongo.service';
import { Domain, DomainSchema } from './schemas/domain.schema';
import { Page, PageSchema } from './schemas/page.schema';
import { Report, ReportSchema } from './schemas/report.schema';
import { Tag, TagSchema } from './schemas/tag.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Domain.name, schema: DomainSchema },
      { name: Page.name, schema: PageSchema },
      // { name: User.name, schema: UserSchema },
      { name: Tag.name, schema: TagSchema },
      // { name: Report.name, schema: ReportSchema },
    ]),
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
