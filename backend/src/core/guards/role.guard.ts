import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleType } from '@enums/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    let requiredRole: RoleType = this.reflector.get<RoleType>(
      'role',
      context.getHandler(),
    );

    const authSkip = this.reflector.get<boolean>(
      'authSkip',
      context.getHandler(),
    );

    if (authSkip) return true;

    if (!requiredRole) requiredRole = RoleType.SUPER_ADMIN;

    const request = context.switchToHttp().getRequest();

    const user = request.user;

    if (!user) return false;

    return user.role >= requiredRole;
  }
}
