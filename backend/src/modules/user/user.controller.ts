import {
  Get,
  Post,
  Put,
  Body,
  Controller,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdatePasswordDTO } from './etc/update-password.dto';
import { CreateUserDTO } from './etc/create-user.dto';
import { User } from '@decorators/user.decorator';
import { UpdateMeDTO } from './etc/update-me.dto';
import { RoleType } from '@enums/role.enum';
import { UserService } from './user.service';
import { JwtGuard } from '@guards/jwt.guard';
import { AuthSkip } from '@guards/auth-skip.guard';
import { RoleGuard } from '@guards/role.guard';
import { Role } from '@decorators/role.decorator';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(JwtGuard, RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Throttle(1, 60 * 10)
  @UseGuards(AuthSkip)
  @Post()
  async create(@Body() createDTO: CreateUserDTO) {
    return await this.userService.create(createDTO);
  }

  @Role(RoleType.USER)
  @Get('@me')
  async getMe(@User() user) {
    return await this.userService.getMe(user);
  }

  @Role(RoleType.USER)
  @Put('@me')
  async updateMe(@User() user, @Body() updateDTO: UpdateMeDTO) {
    return await this.userService.updateMe(user._id, updateDTO);
  }

  @Role(RoleType.USER)
  @Put('@me/password')
  async updateMyPassword(@User() user, @Body() updateDTO: UpdatePasswordDTO) {
    return await this.userService.updateMyPassword(user, updateDTO);
  }

  /**
   * ADMIN ROUTES
   **/

  @Get()
  async getAll(@Query('index') index?: number) {
    return await this.userService.getAll(index);
  }

  @Get(':id')
  async getByID(@Param('id') id: string) {
    return await this.userService.getByID(id);
  }
}
