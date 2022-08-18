import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@config';
import { LighthouseModule } from './modules/lighthouse/lighthouse.module';

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
})
export class AppModule {}
