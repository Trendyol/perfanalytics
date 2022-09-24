import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { isValidObjectId, PaginateModel, PaginateResult } from 'mongoose';
import { UpdatePasswordDTO } from './etc/update-password.dto';
import { CreateUserDTO } from './etc/create-user.dto';
import { UpdateMeDTO } from './etc/update-me.dto';
import { InjectModel } from '@nestjs/mongoose';
import { RoleType } from '@enums/role.enum';
import * as bcrypt from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import { JwtService } from '@nestjs/jwt';
import config from '@config';
import { User } from '@user/etc/user.schema';
import { renderMailContent } from './helpers/mailHelper';
import { mailinator } from './constants';

@Injectable()
export class UserService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel('User') private readonly userModel: PaginateModel<User>,
  ) {}

  async getAll(index: number): Promise<PaginateResult<User>> {
    return this.userModel.paginate(
      {},
      {
        sort: { createdAt: -1 },
        domain: Number(index) + 1,
        projection: { password: 0 },
      },
    );
  }

  async getByID(id: string): Promise<User> {
    const exist = await this.userModel.findOne({ _id: id });

    if (!exist) throw new NotFoundException();

    return exist;
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
    const user = await this.getByEmail(email);
    const currentTimeHash = await bcrypt.hash(new Date().toLocaleString(), 10);

    if (!user) throw new InternalServerErrorException();

    await this.userModel.updateOne(
      { _id: user.id },
      { changeMailTokenKey: currentTimeHash },
    );

    const token = this.jwtService.sign({
      iss: user._id,
      email: user.email,
      key: currentTimeHash,
    });

    return this.sendEmailToRecoverAccount(token, user, language);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async create(createUserDTO: CreateUserDTO): Promise<any> {
    const { email, password, name } = createUserDTO;

    const exist = await this.userModel.exists({ email });
    if (exist) throw new UnprocessableEntityException('Email already exists.');

    const userModel = new this.userModel({
      name: name,
      email: email,
      role: RoleType.USER,
      ...(password && { password: await bcrypt.hash(password, 10) }),
    });

    await userModel.save();

    return userModel;
  }

  async updateMe(id: string, updateDTO: UpdateMeDTO): Promise<boolean> {
    if (!isValidObjectId(id)) throw new BadRequestException();

    await this.userModel.updateOne(
      { _id: id },
      {
        name: updateDTO.name,
      },
    );

    return true;
  }

  async changeUserPassword(token, password) {
    const verifiedToken = this.jwtService.verify(token);
    const currentTimeHash = await bcrypt.hash(new Date().toLocaleString(), 10);

    const newPassword = await bcrypt.hash(password, 10);
    await this.userModel.updateOne(
      { _id: (verifiedToken as any).iss },
      { password: newPassword, changeMailTokenKey: currentTimeHash },
      { new: true },
    );
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
    user: User,
    updateDTO: UpdatePasswordDTO,
  ): Promise<User> {
    const exist = await this.userModel.findOne({ _id: user._id });

    if (!exist) throw new NotFoundException();

    if (!(await bcrypt.compare(updateDTO.oldPassword, user.password)))
      throw new UnprocessableEntityException('Wrong password.');

    const newPassword = await bcrypt.hash(updateDTO.newPassword, 10);
    if (bcrypt.compare(updateDTO.oldPassword, exist.password)) {
      await this.userModel.updateOne(
        { _id: user._id },
        { password: newPassword },
        { new: true },
      );
      return this.userModel.findOne({ _id: user._id }, { password: 0 });
    } else
      throw new UnprocessableEntityException(
        'New password is same as old password.',
      );
  }

  async getMe(user: User) {
    return user;
  }
}
