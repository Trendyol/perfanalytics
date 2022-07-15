import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDTO } from './etc/create-session.dto';
import { RoleGuard } from '@guards/role.guard';
import { JwtGuard } from '@guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

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

  @UseGuards(JwtGuard, RoleGuard)
  @Post(':id')
  async createSessionForUser(@Param('id') id) {
    return await this.sessionService.createSessionForUser(id);
  }
}
