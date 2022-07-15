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
import { Role } from '@decorators/role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { UserDTO } from './etc/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createDTO: CreateUserDTO) {
    return await this.userService.create(createDTO);
  }

  @UseGuards(JwtGuard)
  @Get('@me')
  async getMe(@User() user) {
    console.log('hey');
    const userData = await this.userService.getMe(user);
    const userDTO = plainToInstance(UserDTO, userData, {
      excludeExtraneousValues: true,
    });
    return userDTO;
  }

  @UseGuards(JwtGuard)
  @Role(RoleType.USER)
  @Put('@me')
  async updateMe(@User() user, @Body() updateDTO: UpdateMeDTO) {
    return await this.userService.updateMe(user._id, updateDTO);
  }

  @UseGuards(JwtGuard)
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
