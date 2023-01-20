import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDTO } from './etc/create-session.dto';
import { JwtGuard } from '@guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '@modules/user/user.service';
import { GoogleGuard } from '@core/guards/google.guard';
import config from '@config';
import { CreateSessionParam } from './etc/create-session.param';
@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthCallback(
    @Req() request,
    @Res({ passthrough: true }) response,
  ) {
    let user = await this.userService.getByEmail(request.user.email);

    if (!user) {
      const { email, name } = request.user;
      user = await this.userService.create({
        email,
        name,
      });
    }

    const token = this.sessionService.createSession(user);
    response.cookie('auth-cookie', token, { httpOnly: true });

    return response.redirect(config.clientUrl);
  }

  @Post()
  async createSession(
    @Body() createDTO: CreateSessionDTO,
    @Res({ passthrough: true }) response,
  ) {
    const token = await this.sessionService.create(createDTO);
    response.cookie('auth-cookie', token, { httpOnly: true });
    return;
  }

  @Delete()
  async deleteSession(@Res({ passthrough: true }) response) {
    response.clearCookie('auth-cookie');
    return;
  }

  @UseGuards(JwtGuard)
  @Post(':id')
  async createSessionForUser(@Param() param: CreateSessionParam) {
    const { id } = param;
    return await this.sessionService.createSessionForUser(id);
  }
}
