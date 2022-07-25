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
import { ApiTags } from '@nestjs/swagger';
import { User } from '@core/decorators/user.decorator';
import { CreateDomainDTO } from './etc/create-domain.dto';
import { JwtGuard } from '@core/guards/jwt.guard';
import { DomainService } from './domain.service';
import { UpdateDomainDTO } from './etc/update.domain.dto';
import { DomainDTO } from './etc/domain.dto';
import mapToInstance from '@core/utils/mapper';
import { DeleteDomainParam } from './etc/delete-domain.param';
import { UpdateDomainParam } from './etc/update-domain.param';
import { GetDomainParam } from './etc/get-domain.param';
import { GetDomainsQuery } from './etc/get-domains.query';

@ApiTags('Domain')
@Controller('domain')
export class DomainController {
  constructor(private readonly domainService: DomainService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@User() user, @Body() createDomainDTO: CreateDomainDTO) {
    const domainData = await this.domainService.create(user, createDomainDTO);
    const domainDTO = mapToInstance(DomainDTO, domainData);
    return domainDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query() query: GetDomainsQuery) {
    const { index } = query;
    return await this.domainService.getAllByUser(user, index);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async get(@User() user, @Param() param: GetDomainParam) {
    const { id } = param;
    return await this.domainService.get(user, id);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove(@User() user, @Param() param: DeleteDomainParam) {
    const { id } = param;
    return await this.domainService.remove(user, id);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Param() param: UpdateDomainParam,
    @Body() updateDomainDTO: UpdateDomainDTO,
  ) {
    const { id } = param;
    return await this.domainService.update(user, id, updateDomainDTO);
  }
}
