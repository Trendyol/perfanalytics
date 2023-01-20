import { DataModule } from '@modules/providers/database/data/data.module';
import { Module } from '@nestjs/common';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [DataModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {}
