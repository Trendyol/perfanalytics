import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Page } from './etc/page.schema';
import { User } from '@modules/user/etc/user.schema';
import { CreatePageDTO } from './etc/create-page.dto';
import { UpdatePageDTO } from './etc/update-page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectModel('Page') private readonly pageModel: PaginateModel<Page>,
  ) {}

  async create(user: User, createPageDTO: CreatePageDTO) {
    const { domainId, url, device } = createPageDTO;

    const pageModel = new this.pageModel({
      url: url,
      owner: user,
      domain: domainId,
      device: device,
    });

    const result = await pageModel.save();

    return result;
  }

  async getAllByUser(
    user: User,
    index: number,
    domainId?: string,
  ): Promise<PaginateResult<Page>> {
    const query = {
      owner: user,
      ...(domainId && { domain: domainId }),
    };

    return this.pageModel.paginate(query, {
      sort: { createdAt: -1 },
      page: Number(index) + 1,
    });
  }

  async get(user: User, id: string): Promise<Page> {
    const page = await this.pageModel.findById({ _id: id });

    if (!page) {
      throw new UnprocessableEntityException('Page not found');
    }

    if (String(page.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this page',
      );
    }

    return page;
  }

  async remove(user: User, id: string) {
    const page = await this.pageModel.findById({ _id: id });

    if (!page) {
      throw new UnprocessableEntityException('Page not found');
    }

    if (String(page.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this page',
      );
    }

    return this.pageModel.findByIdAndDelete(id);
  }

  async update(user: User, id: string, updatePageDTO: UpdatePageDTO) {
    const page = await this.pageModel.findById({ _id: id });

    if (!page) {
      throw new UnprocessableEntityException('Page not found');
    }

    if (String(page.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this page',
      );
    }

    return this.pageModel.updateOne({ _id: id }, updatePageDTO);
  }
}