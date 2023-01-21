import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';

import { JwtModule } from '@nestjs/jwt';
import config from '@config';
import { DataModule } from '@modules/providers/database/data/data.module';

@Module({
  imports: [
    DataModule,
    JwtModule.register({
      secret: config.jwtForPasswordRecovery.secret,
      signOptions: {
        expiresIn: config.jwtForPasswordRecovery.expiresIn,
      },
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
