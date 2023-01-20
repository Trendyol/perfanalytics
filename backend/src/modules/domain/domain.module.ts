import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './etc/domain.schema';
import { TagModule } from '@modules/tag/tag.module';
import { DomainService } from './domain.service';
import { TagService } from '@modules/tag/tag.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }]),
  ],
  controllers: [DomainController],
  providers: [DomainService],
  exports: [DomainService],
})
export class DomainModule {}
