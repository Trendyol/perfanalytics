import { User } from '@modules/user/etc/user.schema';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateTagDTO } from './etc/create-tag.dto';
import { Tag } from './etc/tag.schema';
import { UpdateTagDTO } from './etc/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectModel('Tag') private readonly tagModel: PaginateModel<Tag>,
  ) {}

  async create(user: User, createTagDTO: CreateTagDTO) {
    const { name, color } = createTagDTO;

    const tagModel = new this.tagModel({
      name: name,
      color: color,
      owner: user,
    });

    const result = await tagModel.save();

    return result;
  }

  async getAllByUser(user: User, index: number) {
    return this.tagModel.paginate(
      { owner: user },
      {
        sort: { createdAt: -1 },
        domain: Number(index) + 1,
        projection: { password: 0 },
      },
    );
  }

  async get(user: User, id: string) {
    const tag = await this.tagModel.findById({ _id: id });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    if (String(tag.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this tag',
      );
    }

    return tag;
  }

  async update(user: User, id: string, updateTagDTO: UpdateTagDTO) {
    const tag = await this.tagModel.findById({ _id: id });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    if (String(tag.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this tag',
      );
    }

    return this.tagModel.updateOne({ _id: id }, updateTagDTO);
  }

  async remove(user: User, id: string) {
    const tag = await this.tagModel.findById({ _id: id });

    if (!tag) {
      throw new UnprocessableEntityException('Tag not found');
    }

    if (String(tag.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this tag',
      );
    }

    return this.tagModel.findByIdAndDelete(id);
  }
}
