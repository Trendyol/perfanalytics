import { TagModule } from '@modules/tag/tag.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from './etc/page.schema';
import { PageController } from './page.controller';
import { PageService } from './page.service';

@Module({
  imports: [
    TagModule,
    MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }]),
  ],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
