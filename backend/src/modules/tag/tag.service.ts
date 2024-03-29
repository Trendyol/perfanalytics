import { TagEntity } from '@core/data/entities';
import { BaseService } from '@core/data/services/base.service';
import { IDataService } from '@core/data/services/data.service';
import { JwtGuard } from '@core/guards/jwt.guard';
import { UserDto } from '@modules/user/dtos/user.dto';
import {
  NotFoundException,
  Injectable,
  UnprocessableEntityException,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagDto } from './dtos/tag.dto';
import { UpdateTagDto } from './dtos/update-tag.dto';

@Injectable()
@UseGuards(JwtGuard)
export class TagService implements BaseService {
  constructor(private readonly dataService: IDataService) {}
  canAccess(userId: string, tag: TagDto) {
    if (!tag) {
      return false;
    }

    if (String(tag.owner) !== String(userId)) {
      return false;
    }

    return true;
  }

  async create(user, createTagDto: CreateTagDto) {
    const { name, color, domainId, readonly } = createTagDto;
    const tag = await this.dataService.tags.create({
      name,
      color,
      readonly,
      owner: user._id,
      domain: domainId,
    });

    return tag;
  }

  async getAllByUser(user: UserDto, domainId: string) {
    return this.dataService.tags.find({ owner: user._id, domain: domainId });
  }

  async get(user: UserDto, id: string) {
    const tag = await this.dataService.tags.findById(id);
    if (!this.canAccess(user._id, tag)) throw new NotFoundException();

    return tag;
  }

  async update(user: UserDto, id: string, updateTagDto: UpdateTagDto) {
    const tag = await this.dataService.tags.findById(id);
    if (!this.canAccess(user._id, tag)) throw new NotFoundException();

    return this.dataService.tags.updateOneById(id, updateTagDto);
  }

  async remove(user: UserDto, id: string) {
    const tag = await this.dataService.tags.findById(id);
    if (!this.canAccess(user._id, tag)) throw new NotFoundException();

    if (tag.readonly) {
      throw new ForbiddenException();
    }

    return this.dataService.tags.deleteOneById(id);
  }
}
