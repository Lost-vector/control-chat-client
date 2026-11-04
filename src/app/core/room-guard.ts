import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Chat } from './chat';

export const roomGuard: CanActivateFn = (route, state) => {
  const chat = inject(Chat);
  const router = inject(Router);
  return chat.status() !== 'idle' ? true : router.createUrlTree(['/']);
};
