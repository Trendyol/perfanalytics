import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { validate } from '@core/config/validation';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from '@config';
import { UserModule } from '@user/user.module';
import { SessionModule } from '@session/session.module';
import { DomainModule } from '@domain/domain.module';
import { PageModule } from '@modules/page/page.module';
import { TagModule } from './modules/tag/tag.module';
import { LighthouseModule } from '@modules/lighthouse/lighthouse.module';
import { DashboardModule } from '@modules/dashboard/dashboard.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 30,
    }),
    ConfigModule.forRoot({ validate }),
    MongooseModule.forRoot(config.mongo.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    }),
    UserModule,
    SessionModule,
    DomainModule,
    PageModule,
    TagModule,
    LighthouseModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
