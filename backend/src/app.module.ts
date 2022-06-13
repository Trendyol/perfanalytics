import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { validate } from '@core/config/validation';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 30,
    }),
    ConfigModule.forRoot({ validate }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
