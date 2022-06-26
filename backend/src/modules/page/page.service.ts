import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePageDTO } from './etc/create-page.dto';
import { Page } from './etc/page.schema';
import { User } from '@modules/user/etc/user.schema';
import { UpdatePageDTO } from './etc/update.page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('Page') private readonly pageModel: PaginateModel<Page>,
  ) {}

  async create(user: User, createPageDTO: CreatePageDTO) {
    const { name, url } = createPageDTO;

    const pageModel = new this.pageModel({
      name: name,
      url: url,
      owner: user,
    });

    await pageModel.save();

    return pageModel;
  }

  async getAllByUser(user: User, index: number): Promise<PaginateResult<Page>> {
    return this.pageModel.paginate(
      { owner: user },
      {
        sort: { createdAt: -1 },
        page: Number(index) + 1,
        projection: { password: 0 },
      },
    );
  }

  async remove(user: User, id: string) {
    const page = await this.pageModel.findById({ _id: id });

    if (String(page.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this page',
      );
    }

    return this.pageModel.findByIdAndDelete(id);
  }

  async update(user: User, id: string, updatePageDTO: UpdatePageDTO) {
    const page = await this.pageModel.findById({ _id: id });

    if (String(page.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this page',
      );
    }

    return this.pageModel.updateOne({ _id: id }, updatePageDTO);
  }
}
