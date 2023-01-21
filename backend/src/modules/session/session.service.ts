import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UserService } from '@user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as luxon from 'luxon';
import { UserEntity } from '@core/data/entities';
import { CreateSessionDto } from './dtos/create-session.dto';

interface JwtPayload {
  iss: string;
  exp: number;
}

@Injectable()
export class SessionService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<string> {
    const user = await this.userService.getByEmail(createSessionDto.email);
    if (!user || !user.password)
      throw new UnauthorizedException('Email and password mismatch!');

    const isPasswordMatched = await bcrypt.compare(
      createSessionDto.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('Email and password mismatch!');

    return this.createSession(user);
  }

  async verifyPayload({ exp, iss }: JwtPayload) {
    const timeDiff = exp - luxon.DateTime.local().toSeconds();
    if (timeDiff <= 0) throw new UnauthorizedException();

    const user = await this.userService.getByID(iss);
    if (!user) throw new UnauthorizedException();

    return user;
  }

  async createSessionForUser(id) {
    const user = await this.userService.getByID(id);

    this.createSession(user);
  }

  createSession(user) {
    return this.jwtService.sign({
      iss: user._id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    });
  }
}
