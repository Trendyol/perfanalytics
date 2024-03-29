import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDomainDto } from './dtos/create-domain.dto';
import { checkPublicAddress } from '@core/utils/address';
import { IDataService } from '@core/data/services/data.service';
import { DomainEntity } from '@core/data/entities';
import { DEFAULT_TAG } from './constants';
import { BaseService } from '@core/data/services/base.service';
import { UpdateDomainDto } from './dtos/update.domain.dto';
import { UserDto } from '@modules/user/dtos/user.dto';
import { DomainDto } from './dtos/domain.dto';

@Injectable()
export class DomainService implements BaseService {
  constructor(private readonly dataService: IDataService) {}

  canAccess(userId: string, domain: DomainDto) {
    if (!domain) {
      return false;
    }

    if (String(domain.owner) !== String(userId)) {
      return false;
    }

    return true;
  }

  async create(user, CreateDomainDto: CreateDomainDto) {
    const { name, url } = CreateDomainDto;

    const isAddressPublic = await checkPublicAddress(url);
    if (!isAddressPublic) {
      throw new BadRequestException('Address can not be private');
    }

    const domain = await this.dataService.domains.create({
      name: name,
      url: url,
      owner: user._id,
    });

    await this.dataService.tags.create({
      owner: user._id,
      name: DEFAULT_TAG.name,
      color: DEFAULT_TAG.color,
      domain: domain._id,
      readonly: DEFAULT_TAG.readonly,
    });

    return domain;
  }

  async getAllByUser(user: UserDto): Promise<DomainDto[]> {
    return this.dataService.domains.find({ owner: user._id });
  }

  async get(user: UserDto, id: string): Promise<DomainDto> {
    try {
      const domain = await this.dataService.domains.findById(id);
      if (!this.canAccess(user._id, domain)) throw new NotFoundException();

      return domain;
    } catch (error) {
      return error;
    }
  }

  async remove(user: UserDto, id: string) {
    const domain = await this.dataService.domains.findById(id);
    if (!this.canAccess(user._id, domain)) throw new NotFoundException();

    return this.dataService.domains.deleteOneById(id);
  }

  async update(user: UserDto, id: string, UpdateDomainDto: UpdateDomainDto) {
    const domain = await this.dataService.domains.findById(id);
    if (!this.canAccess(user._id, domain)) throw new NotFoundException();

    if (UpdateDomainDto.url) {
      const isAddressPublic = await checkPublicAddress(UpdateDomainDto.url);
      if (!isAddressPublic) {
        throw new BadRequestException('Address can not be private');
      }
    }

    return this.dataService.domains.updateOneById(id, UpdateDomainDto);
  }

  count(user: UserDto) {
    return this.dataService.domains.count({
      owner: user._id,
    });
  }
}
