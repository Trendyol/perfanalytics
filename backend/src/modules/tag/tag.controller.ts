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
import { plainToInstance } from 'class-transformer';
import { CreateTagDTO } from './etc/create-tag.dto';
import { TagDTO } from './etc/tag.dto';
import { UpdateTagDTO } from './etc/update-tag.dto';
import { TagService } from './tag.service';

@ApiTags('Tag')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@User() user, @Body() createTagDTO: CreateTagDTO) {
    const tagData = await this.tagService.create(user, createTagDTO);
    const tagDTO = plainToInstance(TagDTO, tagData, {
      excludeExtraneousValues: true,
    });
    return tagDTO;
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query('index') index: number) {
    return await this.tagService.getAllByUser(user, index);
  }

  @Get('/:id')
  @UseGuards(JwtGuard)
  async get(@User() user, @Param('id') id: string) {
    return await this.tagService.get(user, id);
  }

  @Put()
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Query('id') id: string,
    @Body() updateTagDTO: UpdateTagDTO,
  ) {
    return await this.tagService.update(user, id, updateTagDTO);
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async remove(@User() user, @Param('id') id: string) {
    return await this.tagService.remove(user, id);
  }
}
