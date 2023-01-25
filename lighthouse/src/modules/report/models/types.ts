import { usefulAudits } from './constants';

export type Audits = Partial<
  Record<typeof usefulAudits[number], number> & {
    performance: number;
  }
>;
