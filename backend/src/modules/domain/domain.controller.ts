import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@core/decorators/user.decorator';
import { CreateDomainDTO } from './etc/create-domain.dto';
import { JwtGuard } from '@core/guards/jwt.guard';
import { DomainService } from './domain.service';
import { UpdateDomainDTO } from './etc/update.domain.dto';
import { DomainDTO } from './etc/domain.dto';
import { plainToInstance } from 'class-transformer';

@ApiTags('Domain')
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Throttle(300, 60)
  @UseGuards(JwtGuard)
  @Post()
  async create(@User() user, @Body() createDomainDTO: CreateDomainDTO) {
    const domainData = await this.domainService.create(user, createDomainDTO);
    const domainDTO = plainToInstance(DomainDTO, domainData, {
      excludeExtraneousValues: true,
    });
    return domainDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query('index') index: number) {
    return await this.domainService.getAllByUser(user, index);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async get(@User() user, @Param('id') id: string) {
    return await this.domainService.get(user, id);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove(@User() user, @Param('id') id: string) {
    return await this.domainService.remove(user, id);
  }

  @Put()
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Query('id') id: string,
    @Body() updateDomainDTO: UpdateDomainDTO,
  ) {
    return await this.domainService.update(user, id, updateDomainDTO);
  }
}
