import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/api/users/entities/user.entity';

const getAuthUser = (data: unknown, ctx: ExecutionContext): User => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
};

export const AuthUser = createParamDecorator(getAuthUser);
