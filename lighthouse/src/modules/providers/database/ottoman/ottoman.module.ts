import { IDataService } from '@core/data/services/data.service';
import { Module } from '@nestjs/common';

import { OttomanDataService } from './ottoman.service';

@Module({
  providers: [
    {
      provide: IDataService,
      useClass: OttomanDataService,
    },
  ],
  exports: [IDataService],
})
export class OttomanModule {}
