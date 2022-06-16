import { SetMetadata } from '@nestjs/common';
import { RoleType } from '@enums/role.enum';

// noinspection JSUnusedGlobalSymbols
export const Role = (role: RoleType) => SetMetadata('role', role);
