import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LighthouseSchema } from './dto/lighthouse.schema';
import { LighthouseService } from './lighthouse.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Lighthouse', schema: LighthouseSchema },
    ]),
  ],
  controllers: [],
  providers: [LighthouseService],
  exports: [LighthouseService],
})
export class LighthouseModule {}
