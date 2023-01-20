import { Module } from '@nestjs/common';
import { MongoModule } from '../mongo/mongo.module';

@Module({
  imports: [MongoModule],
  exports: [MongoModule],
})
export class DataModule {}
