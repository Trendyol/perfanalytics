import config from '@core/config';
import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';
import { OttomanModule } from '../ottoman/ottoman.module';

@Module({
  imports: [config.database === 'couchbase' ? OttomanModule : MongoModule],
  exports: [config.database === 'couchbase' ? OttomanModule : MongoModule],
})
export class DataModule {}
