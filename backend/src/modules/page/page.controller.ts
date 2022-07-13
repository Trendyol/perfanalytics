import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreatePageDTO } from './etc/create-page.dto';
import { PageDTO } from './etc/page.dto';
import { PageService } from './page.service';

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@User() user, @Body() createPageDTO: CreatePageDTO) {
    const pageData = await this.pageService.create(user, createPageDTO);
    const pageDTO = plainToInstance(PageDTO, pageData, {
      excludeExtraneousValues: true,
    });
    return pageDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(
    @User() user,
    @Query('index') index: number,
    @Query('domainId') domainId?: string,
  ) {
    return await this.pageService.getAllByUser(user, index, domainId);
  }
}
