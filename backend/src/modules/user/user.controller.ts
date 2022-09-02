import { Get, Post, Put, Body, Controller, UseGuards } from '@nestjs/common';
import { UpdatePasswordDTO } from './etc/update-password.dto';
import { CreateUserDTO } from './etc/create-user.dto';
import { User } from '@decorators/user.decorator';
import { UpdateMeDTO } from './etc/update-me.dto';
import { RoleType } from '@enums/role.enum';
import { UserService } from './user.service';
import { JwtGuard } from '@guards/jwt.guard';
import { Role } from '@decorators/role.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './etc/user.dto';
import mapToInstance from '@core/utils/mapper';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('recover-password')
  async recoverPassword(@Body() createDTO) {
    return await this.userService.recoverPassword(
      createDTO.email,
      createDTO.language,
    );
  }

  @Post('password-change')
  async changePassword(@Body() { token, password }) {
    return await this.userService.changeUserPassword(token, password);
  }

  @Post()
  async create(@Body() createDTO: CreateUserDTO) {
    return await this.userService.create(createDTO);
  }

  @UseGuards(JwtGuard)
  @Get('@me')
  async getMe(@User() user) {
    const userData = await this.userService.getMe(user);
    const userDTO = mapToInstance(UserDTO, userData);
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
}
