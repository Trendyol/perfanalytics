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
import { CreateTagDTO } from './etc/create-tag.dto';
import { DeleteTagParam } from './etc/delete-tag.param';
import { GetTagParam } from './etc/get-tag.param';
import { GetTagsParam } from './etc/get-tags.query';
import { TagDTO } from './etc/tag.dto';
import { UpdateTagDTO } from './etc/update-tag.dto';
import { UpdateTagParam } from './etc/update-tag.param';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@User() user, @Body() createTagDTO: CreateTagDTO) {
    const tagData = await this.tagService.create(user, createTagDTO);
    const tagDTO = mapToInstance(TagDTO, tagData);
    return tagDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query() query: GetTagsParam) {
    const { index, domainId } = query;
    return await this.tagService.getAllByUser(user, index, domainId);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async get(@User() user, @Param() param: GetTagParam) {
    const { id } = param;
    return await this.tagService.get(user, id);
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Param() param: UpdateTagParam,
    @Body() updateTagDTO: UpdateTagDTO,
  ) {
    const { id } = param;
    return await this.tagService.update(user, id, updateTagDTO);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove(@User() user, @Param() param: DeleteTagParam) {
    const { id } = param;
    return await this.tagService.remove(user, id);
  }
}
