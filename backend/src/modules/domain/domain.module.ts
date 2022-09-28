import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './etc/domain.schema';
import { TagModule } from '@modules/tag/tag.module';
import { DomainService } from './domain.service';
import { TagService } from '@modules/tag/tag.service';
import { TagSchema } from '@modules/tag/etc/tag.schema';

@Module({
  imports: [
    TagModule,
    MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }]),
    MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }]),
  ],
  controllers: [DomainController],
  providers: [DomainService, TagService],
  exports: [DomainService],
})
export class DomainModule {}
