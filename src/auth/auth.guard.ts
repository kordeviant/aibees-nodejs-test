import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // console.log('nbmbnm');

    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    // return super.canActivate(context);
    context['user'] = {
      name: 'anybody',
      roles: ['admin'],
    };
    return true;
  }
}
