import { Module } from '@nestjs/common';
import { CdnModule } from '../cdn/cdn.module';

@Module({
  imports: [CdnModule],
  exports: [CdnModule],
})
export class StorageModule {}
