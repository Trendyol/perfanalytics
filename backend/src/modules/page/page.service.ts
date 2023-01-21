import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@modules/user/etc/user.schema';
import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { TagService } from '@modules/tag/tag.service';
import { checkPublicAddress } from '../../core/utils/address';
import { IDataService } from '@core/data/services/data.service';
import { PageEntity } from '@core/data/entities';
import { BaseService } from '@core/data/services/base.service';

@Injectable()
export class PageService implements BaseService {
  constructor(
    private readonly dataService: IDataService,
    private readonly tagService: TagService,
  ) {}

  canAccess(userId: string, page: PageEntity) {
    if (!page) {
      return false;
    }

    if (String(page.owner) !== String(userId)) {
      return false;
    }

    return true;
  }

  async create(user: User, createPageDto: CreatePageDto) {
    const { domainId, tagId, url, device } = createPageDto;

    const isAddressPublic = await checkPublicAddress(url);
    if (!isAddressPublic) throw new BadRequestException('Can not be private');

    const page = await this.dataService.pages.create({
      url: url,
      owner: user._id,
      domain: domainId,
      device: device,
      ...(tagId && { tag: tagId }),
    });

    return page;
  }

  async getAllByUser(
    user: User,
    domainId?: string,
    tagId?: string,
  ): Promise<PageEntity[]> {
    const tag = tagId && (await this.tagService.get(user, tagId));

    const query = {
      owner: user,
      ...(domainId && { domain: domainId }),
      ...(tagId && !tag.readonly && { tag: tagId }),
    };

    return this.dataService.pages.find(query);
  }

  async get(user: User, id: string): Promise<PageEntity> {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    return page;
  }

  async remove(user: User, id: string) {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    return this.dataService.pages.deleteOneById(id);
  }

  async update(user: User, id: string, updatePageDto: UpdatePageDto) {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    if (updatePageDto.url) {
      const isAddressPublic = await checkPublicAddress(updatePageDto.url);
      if (!isAddressPublic) throw new BadRequestException('Can not be private');
    }
    console.log('page update', page);

    return this.dataService.pages.updateOneById(id, updatePageDto);
  }

  // getCount(user: User, domainId?: string) {
  //   return this.pageModel.countDocuments({
  //     owner: user,
  //     ...(domainId && { domain: domainId }),
  //   });
  // }
}
