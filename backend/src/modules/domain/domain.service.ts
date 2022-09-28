import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDomainDTO } from './etc/create-domain.dto';
import { Domain } from './etc/domain.schema';
import { User } from '@modules/user/etc/user.schema';
import { UpdateDomainDTO } from './etc/update.domain.dto';
import { TagService } from '@modules/tag/tag.service';
import { DEFAULT_TAG } from './constants';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel('Domain') private readonly domainModel: PaginateModel<Domain>,
    private readonly tagService: TagService,
  ) {}

  async create(user: User, createDomainDTO: CreateDomainDTO) {
    const { name, url } = createDomainDTO;

    const domainModel = new this.domainModel({
      name: name,
      url: url,
      owner: user,
    });

    const result = await domainModel.save();

    await this.tagService.create(user, {
      name: DEFAULT_TAG.name,
      color: DEFAULT_TAG.color,
      domainId: result._id,
      isDefaultTag: DEFAULT_TAG.isDefault,
    });

    return result;
  }

  async getAllByUser(
    user: User,
    index: number,
  ): Promise<PaginateResult<Domain>> {
    return this.domainModel.paginate(
      { owner: user },
      {
        sort: { createdAt: -1 },
        domain: Number(index) + 1,
        projection: { password: 0 },
      },
    );
  }

  async get(user: User, id: string): Promise<Domain> {
    const domain = await this.domainModel.findById({ _id: id });

    if (!domain) {
      throw new UnprocessableEntityException('Domain not found');
    }

    if (String(domain.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this domain',
      );
    }

    return domain;
  }

  async remove(user: User, id: string) {
    const domain = await this.domainModel.findById({ _id: id });

    if (!domain) {
      throw new UnprocessableEntityException('Domain not found');
    }

    if (String(domain.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this domain',
      );
    }

    return this.domainModel.findByIdAndDelete(id);
  }

  async update(user: User, id: string, updateDomainDTO: UpdateDomainDTO) {
    const domain = await this.domainModel.findById({ _id: id });

    if (!domain) {
      throw new UnprocessableEntityException('Domain not found');
    }

    if (String(domain.owner) !== String(user._id)) {
      throw new UnprocessableEntityException(
        'You are not the owner of this domain',
      );
    }

    return this.domainModel.updateOne({ _id: id }, updateDomainDTO);
  }

  async getCount(user: User) {
    const count = await this.domainModel.countDocuments({
      owner: user,
    });

    return count;
  }
}
