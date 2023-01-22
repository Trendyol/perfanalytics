import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { CreatePageDto } from './dtos/create-page.dto';
import { UpdatePageDto } from './dtos/update-page.dto';
import { TagService } from '@modules/tag/tag.service';
import { checkPublicAddress } from '../../core/utils/address';
import { IDataService } from '@core/data/services/data.service';
import { BaseService } from '@core/data/services/base.service';
import { UserDto } from '@modules/user/dtos/user.dto';
import { PageDto } from './dtos/page.dto';

@Injectable()
export class PageService implements BaseService {
  constructor(
    private readonly dataService: IDataService,
    private readonly tagService: TagService,
  ) {}

  canAccess(userId: string, page: PageDto) {
    if (!page) {
      return false;
    }

    if (String(page.owner) !== String(userId)) {
      return false;
    }

    return true;
  }

  async create(user: UserDto, createPageDto: CreatePageDto) {
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

  async getAll(
    user?: UserDto,
    domainId?: string,
    tagId?: string,
  ): Promise<PageDto[]> {
    const tag = tagId && (await this.tagService.get(user, tagId));

    const query = {
      ...(user && { owner: user._id }),
      ...(domainId && { domain: domainId }),
      ...(tagId && !tag.readonly && { tag: tagId }),
    };

    return this.dataService.pages.find(query);
  }

  async get(user: UserDto, id: string): Promise<PageDto> {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    return page;
  }

  async remove(user: UserDto, id: string) {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    return this.dataService.pages.deleteOneById(id);
  }

  async update(user: UserDto, id: string, updatePageDto: UpdatePageDto) {
    const page = await this.dataService.pages.findById(id);
    if (!this.canAccess(user._id, page)) throw new NotFoundException();

    if (updatePageDto.url) {
      const isAddressPublic = await checkPublicAddress(updatePageDto.url);
      if (!isAddressPublic) throw new BadRequestException('Can not be private');
    }

    return this.dataService.pages.updateOneById(id, updatePageDto);
  }

  count(user: UserDto, domainId?: string) {
    return this.dataService.pages.count({
      owner: user._id,
      ...(domainId && { domain: domainId }),
    });
  }
}
