import { User } from '@core/decorators/user.decorator';
import { JwtGuard } from '@core/guards/jwt.guard';
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
import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { PageService } from './page.service';

@ApiTags('Page')
@Controller('page')
@UseGuards(JwtGuard)
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Post()
  async create(@User() user, @Body() createPageDto: CreatePageDto) {
    const page = await this.pageService.create(user, createPageDto);
    return page;
  }

  @Get()
  async getAllByUser(
    @User() user,
    @Query('domainId') domainId: string,
    @Query('tagId') tagId: string,
  ) {
    return await this.pageService.getAllByUser(user, domainId, tagId);
  }

  @Get('/:id')
  async get(@User() user, @Param('id') id: string) {
    return await this.pageService.get(user, id);
  }

  @Delete('/:id')
  async remove(@User() user, @Param('id') id: string) {
    return await this.pageService.remove(user, id);
  }

  @Put('/:id')
  async update(
    @User() user,
    @Param('id') id: string,
    @Body() updatePageDto: UpdatePageDto,
  ) {
    return await this.pageService.update(user, id, updatePageDto);
  }
}
