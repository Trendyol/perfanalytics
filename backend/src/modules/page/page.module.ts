import { Module } from '@nestjs/common';
import { PageController } from './page.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PageSchema } from './etc/page.schema';
import { PageService } from './page.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Page', schema: PageSchema }])],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
