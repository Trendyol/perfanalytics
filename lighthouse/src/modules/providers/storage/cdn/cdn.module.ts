import { IStorageService } from '@core/data/services/storage.service';
import { Module } from '@nestjs/common';
import { CdnStorageService } from './cdn.service';

@Module({
  providers: [
    {
      provide: IStorageService,
      useClass: CdnStorageService,
    },
  ],
  exports: [IStorageService],
})
export class CdnModule {}
