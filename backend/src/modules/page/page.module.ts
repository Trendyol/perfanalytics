import { DataModule } from '@modules/providers/database/data/data.module';
import { TagModule } from '@modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [TagModule, DataModule],
  controllers: [PageController],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
