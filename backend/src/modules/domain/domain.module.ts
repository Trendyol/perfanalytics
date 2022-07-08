import { Module } from '@nestjs/common';
import { DomainController } from './domain.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DomainSchema } from './etc/domain.schema';
import { DomainService } from './domain.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Domain', schema: DomainSchema }])],
  controllers: [DomainController],
  providers: [DomainService],
})
export class DomainModule {}
