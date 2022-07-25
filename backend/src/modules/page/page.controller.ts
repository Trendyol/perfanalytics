import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
import mapToInstance from '@core/utils/mapper';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePageDTO } from './etc/create-page.dto';
import { DeletePageParam } from './etc/delete-page.param';
import { GetPageParam } from './etc/get-page.param';
import { GetPagesQuery } from './etc/get-pages.query';
import { PageDTO } from './etc/page.dto';
import { UpdatePageDTO } from './etc/update-page.dto';
import { UpdatePageParam } from './etc/update-page.param';
import { PageService } from './page.service';

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@User() user, @Body() createPageDTO: CreatePageDTO) {
    const pageData = await this.pageService.create(user, createPageDTO);
    const pageDTO = mapToInstance(PageDTO, pageData);
    return pageDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query() query: GetPagesQuery) {
    const { index, domainId, tagId } = query;
    return await this.pageService.getAllByUser(user, index, domainId, tagId);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async get(@User() user, @Param() params: GetPageParam) {
    const { id } = params;
    return await this.pageService.get(user, id);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove(@User() user, @Param() param: DeletePageParam) {
    const { id } = param;
    return await this.pageService.remove(user, id);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Param() param: UpdatePageParam,
    @Body() updatePageDTO: UpdatePageDTO,
  ) {
    const { id } = param;
    return await this.pageService.update(user, id, updatePageDTO);
  }
}
