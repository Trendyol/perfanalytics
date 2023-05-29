import { Get, Post, Put, Body, Controller, UseGuards } from '@nestjs/common';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from '@decorators/user.decorator';
import { UserService } from './user.service';
import { JwtGuard } from '@guards/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import mapToInstance from '@core/utils/mapper';
import { RecoverPasswordDto } from './dtos/recover-password.dto';
import { UserDto } from './dtos/user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('recover-password')
  async recoverPassword(@Body() recoverPasswordDto: RecoverPasswordDto) {
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
  async create(@Body() createDTO: CreateUserDto) {
    const user = await this.userService.create(createDTO);
    const userDto = mapToInstance(UserDto, user);
    return userDto;
  }

  @UseGuards(JwtGuard)
  @Get('@me')
  async getMe(@User() user) {
    const userData = await this.userService.getMe(user);
    const userDTO = mapToInstance(UserDto, userData);
    return userDTO;
  }

  @UseGuards(JwtGuard)
  @Put('@me')
  async updateUser(@User() user, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(user._id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Put('@me/password')
  async updateMyPassword(
    @User() user,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const updatedUser = await this.userService.updateMyPassword(
      user,
      updatePasswordDto,
    );
    const userDto = mapToInstance(UserDto, updatedUser);
    return userDto;
  }
}
