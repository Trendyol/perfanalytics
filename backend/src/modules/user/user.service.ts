import {
  BadRequestException,
  Injectable,
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
import { User } from '@user/etc/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly model: PaginateModel<User>,
  ) {}

  async getAll(index: number): Promise<PaginateResult<User>> {
    return this.model.paginate(
      {},
      {
        sort: { createdAt: -1 },
        page: Number(index) + 1,
        projection: { password: 0 },
      },
    );
  }

  async getByID(id: string): Promise<User> {
    if (!isValidObjectId(id)) throw new BadRequestException();

    const exist = await this.model.findOne({ _id: id });

    if (!exist) throw new NotFoundException();

    return exist;
  }

  async getByEmail(email: string): Promise<User> {
    return this.model.findOne({ email });
  }

  async create(createDTO: CreateUserDTO): Promise<any> {
    const { email, password, name } = createDTO;

    const exist = await this.model.exists({ email });
    if (exist) throw new UnprocessableEntityException('Email already exists.');

    const model = new this.model({
      name: name,
      email: email,
      password: await bcrypt.hash(password, 10),
      role: RoleType.USER,
    });

    await model.save();

    return model;
  }

  async updateMe(id: string, updateDTO: UpdateMeDTO): Promise<boolean> {
    if (!isValidObjectId(id)) throw new BadRequestException();

    await this.model.updateOne(
      { _id: id },
      {
        name: updateDTO.name,
      },
    );

    return true;
  }

  async updateMyPassword(
    user: User,
    updateDTO: UpdatePasswordDTO,
  ): Promise<User> {
    if (!isValidObjectId(user._id)) throw new BadRequestException();

    const exist = await this.model.findOne({ _id: user._id });

    if (!exist) throw new NotFoundException();

    if (!(await bcrypt.compare(updateDTO.oldPassword, user.password)))
      throw new UnprocessableEntityException('Wrong password.');

    const newPassword = await bcrypt.hash(updateDTO.newPassword, 10);
    if (bcrypt.compare(updateDTO.oldPassword, exist.password)) {
      await this.model.updateOne(
        { _id: user._id },
        { password: newPassword },
        { new: true },
      );
      return this.model.findOne({ _id: user._id }, { password: 0 });
    } else
      throw new UnprocessableEntityException(
        'New password is same as old password.',
      );
  }

  async getMe(user: User) {
    return user;
  }
}
