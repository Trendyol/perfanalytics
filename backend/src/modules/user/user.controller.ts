import { Get, Post, Put, Body, Controller, UseGuards } from '@nestjs/common';
import { UpdatePasswordDTO } from './etc/update-password.dto';
import { CreateUserDTO } from './etc/create-user.dto';
import { User } from '@decorators/user.decorator';
import { UpdateMeDTO } from './etc/update-me.dto';
import { UserService } from './user.service';
import { JwtGuard } from '@guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserDTO } from './etc/user.dto';
import mapToInstance from '@core/utils/mapper';
import { RecoverPasswordDTO } from './etc/recover-password.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDTO) {
    return await this.userService.recoverPassword(
      recoverPasswordDto.email,
      recoverPasswordDto.language,
    );
  }

  @Post('password-change')
  async changePassword(@Body() { token, password }) {
    return await this.userService.changeUserPassword(token, password);
  }

  @Post('password-token-verify')
  async verifyMailChangeToken(@Body() { token }) {
    return await this.userService.verifyMailChangeToken(token);
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
  @Put('@me')
  async updateMe(@User() user, @Body() updateDTO: UpdateMeDTO) {
    return await this.userService.updateMe(user._id, updateDTO);
  }

  @UseGuards(JwtGuard)
  @Put('@me/password')
  async updateMyPassword(@User() user, @Body() updateDTO: UpdatePasswordDTO) {
    return await this.userService.updateMyPassword(user, updateDTO);
  }
}
