import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // fake authentication guard that sets user property in context
    context['user'] = {
      name: 'anybody',
      roles: ['admin'],
    };
    return true;
  }
}
