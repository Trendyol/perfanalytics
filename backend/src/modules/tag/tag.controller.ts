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
import { CreateTagDto } from './dtos/create-tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
@UseGuards(JwtGuard)
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  async create(@User() user, @Body() createTagDto: CreateTagDto) {
    const tag = await this.tagService.create(user, createTagDto);
    return tag;
  }

  @Get()
  async getAllByUser(@User() user, @Query('domainId') domainId: string) {
    return await this.tagService.getAllByUser(user, domainId);
  }

  @Get('/:id')
  async get(@User() user, @Param('id') id: string) {
    return await this.tagService.get(user, id);
  }

  @Put('/:id')
  async update(
    @User() user,
    @Param('id') id: string,
    @Body() updateTagDto: UpdateTagDto,
  ) {
    return await this.tagService.update(user, id, updateTagDto);
  }

  @Delete('/:id')
  async remove(@User() user, @Param('id') id: string) {
    return await this.tagService.remove(user, id);
  }
}
