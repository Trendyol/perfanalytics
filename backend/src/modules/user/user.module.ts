import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './etc/user.schema';
import { JwtModule } from '@nestjs/jwt';
import config from '@config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
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
