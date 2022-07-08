import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PaginateModel, PaginateResult } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDomainDTO } from './etc/create-domain.dto';
import { Domain } from './etc/domain.schema';
import { User } from '@modules/user/etc/user.schema';
import { UpdateDomainDTO } from './etc/update.domain.dto';

@Injectable()
export class DomainService {
  constructor(
    @InjectModel('Domain') private readonly domainModel: PaginateModel<Domain>,
  ) {}

  async create(user: User, createDomainDTO: CreateDomainDTO) {
    const { name, url } = createDomainDTO;

    const domainModel = new this.domainModel({
      name: name,
      url: url,
      owner: user,
    });

    await domainModel.save();

    return domainModel;
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
}
