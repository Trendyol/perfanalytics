import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateDomainDto } from './dtos/create-domain.dto';
import { User } from '@modules/user/etc/user.schema';
import { checkPublicAddress } from '@core/utils/address';
import { IDataService } from '@core/data/services/data.service';
import { DomainEntity } from '@core/data/entities';
import { DEFAULT_TAG } from './constants';
import { BaseService } from '@core/data/services/base.service';
import { UpdateDomainDto } from './dtos/update.domain.dto';

@Injectable()
export class DomainService implements BaseService {
  constructor(private readonly dataService: IDataService) {}

  canAccess(userId: string, domain: DomainEntity) {
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

  async getAllByUser(user: User): Promise<DomainEntity[]> {
    return this.dataService.domains.find({ owner: user });
  }

  async get(user: User, id: string): Promise<DomainEntity> {
    try {
      const domain = await this.dataService.domains.findById(id);
      if (!this.canAccess(user._id, domain)) throw new NotFoundException();

      return domain;
    } catch (error) {
      return error;
    }
  }

  async remove(user: User, id: string) {
    const domain = await this.dataService.domains.findById(id);
    if (!this.canAccess(user._id, domain)) throw new NotFoundException();

    return this.dataService.domains.deleteOneById(id);
  }

  async update(user: User, id: string, UpdateDomainDto: UpdateDomainDto) {
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

  // async getCount(user: User) {
  //   const count = await this.domainModel.countDocuments({
  //     owner: user,
  //   });

  //   return count;
  // }
}
