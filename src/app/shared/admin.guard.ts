import { CanActivateFn } from '@angular/router';
import { SessionService } from '../services/session.service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  let sessionService = inject(SessionService);
  let user = sessionService.data;
  if (user?.role === 'ADMIN') {
    return true;
  }
  return false;
};

export const userGuard: CanActivateFn = (route, state) => {
  let sessionService = inject(SessionService);
  let user = sessionService.data;
  if (user?.role === 'USER') {
    return true;
  }
  return false;
};
