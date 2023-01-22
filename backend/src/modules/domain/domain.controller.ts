import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@core/decorators/user.decorator';
import { CreateDomainDto } from './dtos/create-domain.dto';
import { JwtGuard } from '@core/guards/jwt.guard';
import { DomainService } from './domain.service';
import { UpdateDomainDto } from './dtos/update.domain.dto';

@ApiTags('Domain')
@Controller('domain')
@UseGuards(JwtGuard)
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @Post()
  async create(@User() user, @Body() createDomainDto: CreateDomainDto) {
    const domain = await this.domainService.create(user, createDomainDto);
    return domain;
  }

  @Get()
  async getAllByUser(@User() user) {
    return this.domainService.getAllByUser(user);
  }

  @Get('/:id')
  async get(@User() user, @Param('id') id: string) {
    return await this.domainService.get(user, id);
  }

  @Delete('/:id')
  async remove(@User() user, @Param('id') id: string) {
    return await this.domainService.remove(user, id);
  }

  @Put('/:id')
  async update(
    @User() user,
    @Param('id') id: string,
    @Body() updateDomainDto: UpdateDomainDto,
  ) {
    return await this.domainService.update(user, id, updateDomainDto);
  }
}
