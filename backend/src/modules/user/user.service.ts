import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import config from '@config';
import { renderMailContent } from './helpers/mailHelper';
import { mailinator } from './constants';
import { IDataService } from '@core/data/services/data.service';
import { UserEntity } from '@core/data/entities';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly dataService: IDataService,
    private readonly jwtService: JwtService,
  ) {}

  async getByID(id: string): Promise<UserDto> {
    const user = await this.dataService.users.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  async sendEmailToRecoverAccount(token, user, language) {
    const { host, port, secure, sender, password, subject } = mailinator;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: sender,
        pass: password,
      },
    });

    const redirectionUrl = `${config.clientUrl}${language}/reset-password?token=${token}`;
    const userDisplayingName =
      user.name.charAt(0).toUpperCase() + user.name.slice(1);

    const mailOptions = {
      from: sender,
      to: user.email,
      html: renderMailContent(userDisplayingName, redirectionUrl, language),
      subject: subject[language as any],
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        throw new InternalServerErrorException();
      }
      return;
    });
  }

  async recoverPassword(email: string, language: string) {
    const user = (await this.getByEmail(email)) as unknown as UserDto;
    const currentTimeHash = await bcrypt.hash(new Date().toLocaleString(), 10);

    if (!user) throw new InternalServerErrorException();

    await this.dataService.users.updateOneById(user._id, {
      changeMailTokenKey: currentTimeHash,
    });

    const token = this.jwtService.sign({
      iss: user._id,
      email: user.email,
      key: currentTimeHash,
    });

    return this.sendEmailToRecoverAccount(token, user, language);
  }

  async getByEmail(email: string): Promise<UserDto> {
    return this.dataService.users.findOne({ email });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { email, password, name } = createUserDto;

    const userExists = await this.dataService.users.findOne({ email });
    if (userExists) throw new BadRequestException('Email already exists.');

    const user = await this.dataService.users.create({
      name: name,
      email: email,
      emailVerified: false,
      changeMailTokenKey: '',
      ...(password && { password: await bcrypt.hash(password, 10) }),
    });

    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
    this.dataService.users.updateOneById(id, updateUserDto);

    return true;
  }

  async changeUserPassword(token, password) {
    const verifiedToken = this.jwtService.verify(token);
    const currentTimeHash = await bcrypt.hash(new Date().toLocaleString(), 10);

    const newPassword = await bcrypt.hash(password, 10);
    await this.dataService.users.updateOneById((verifiedToken as any).iss, {
      password: newPassword,
      changeMailTokenKey: currentTimeHash,
    });
  }

  async verifyMailChangeToken(token) {
    const verifiedToken = this.jwtService.verify(token);

    const user = await this.getByEmail(verifiedToken.email);
    if (!user) throw new InternalServerErrorException();

    if (
      !verifiedToken ||
      !Object.keys(verifiedToken).length ||
      verifiedToken.key !== user.changeMailTokenKey
    )
      throw new UnprocessableEntityException('Token verify failed');
  }

  async updateMyPassword(
    user: UserDto,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserDto> {
    const userExist = await this.dataService.users.findById(user._id);
    if (!userExist) throw new NotFoundException();

    if (!(await bcrypt.compare(updatePasswordDto.oldPassword, user.password)))
      throw new UnprocessableEntityException('Wrong password.');

    const newPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    this.dataService.users.updateOneById(user._id, {
      password: newPassword,
    });

    return userExist;
  }

  async getMe(user: UserDto) {
    return user;
  }
}
