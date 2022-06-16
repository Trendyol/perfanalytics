import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@modules/user/etc/user.schema';
import { UserService } from '@user/user.service';
import { CreateSessionDTO } from './etc/create-session.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import * as luxon from 'luxon';

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

  async create(createDTO: CreateSessionDTO): Promise<string> {
    const user = await this.userService.getByEmail(createDTO.email);

    if (!user) throw new UnauthorizedException('Email and password mismatch!');

    const isPasswordMatched = await bcrypt.compare(
      createDTO.password,
      user.password,
    );

    if (!isPasswordMatched)
      throw new UnauthorizedException('Email and password mismatch!');

    return this.createSession(user);
  }

  async verifyPayload({ exp, iss }: JwtPayload): Promise<User> {
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

  createSession(user: User) {
    return this.jwtService.sign({
      iss: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
    });
  }
}
