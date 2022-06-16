import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { SessionService } from './session.service';
import { CreateSessionDTO } from './etc/create-session.dto';
import { RoleGuard } from '@guards/role.guard';
import { JwtGuard } from '@guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Session')
@Controller('session')
export class SessionController {
  constructor(private readonly service: SessionService) {}

  @Throttle(3, 60)
  @Post()
  async createSession(@Body() createDTO: CreateSessionDTO) {
    return await this.service.create(createDTO);
  }

  @UseGuards(JwtGuard, RoleGuard)
  @Post(':id')
  async createSessionForUser(@Param('id') id) {
    return await this.service.createSessionForUser(id);
  }
}
