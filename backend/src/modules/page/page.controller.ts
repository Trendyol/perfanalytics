import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@core/decorators/user.decorator';
import { CreatePageDTO } from './etc/create-page.dto';
import { JwtGuard } from '@core/guards/jwt.guard';
import { PageService } from './page.service';
import { UpdatePageDTO } from './etc/update.page.dto';

@ApiTags('Page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Throttle(3, 60)
  @UseGuards(JwtGuard)
  @Post()
  async create(@User() user, @Body() createPageDTO: CreatePageDTO) {
    this.pageService.create(user, createPageDTO);
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@User() user, @Query('index') index: number) {
    return await this.pageService.getAllByUser(user, index);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async remove(@User() user, @Query('id') id: string) {
    return await this.pageService.remove(user, id);
  }

  @Put()
  @UseGuards(JwtGuard)
  async update(
    @User() user,
    @Query('id') id: string,
    @Body() updatePageDTO: UpdatePageDTO,
  ) {
    return await this.pageService.update(user, id, updatePageDTO);
  }
}
