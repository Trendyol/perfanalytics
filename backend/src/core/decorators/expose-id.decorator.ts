import { ExposeOptions, Transform } from 'class-transformer';

export const ExposeId =
  (options?: any) => (target: any, propertyKey: string) => {
    Transform(({ obj }) => obj[propertyKey])(target, propertyKey);
  };
