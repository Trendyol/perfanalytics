import { ClassConstructor, plainToInstance } from 'class-transformer';

const mapToInstance = (dto: ClassConstructor<unknown>, plain: any) => {
  return plainToInstance(dto, plain, {
    excludeExtraneousValues: true,
  });
};

export default mapToInstance;
