import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@config';
import { LighthouseModule } from './modules/lighthouse/lighthouse.module';
import { LighthouseService } from './modules/lighthouse/lighthouse.service';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    }),
    LighthouseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
