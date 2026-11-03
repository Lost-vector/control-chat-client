import { CanActivateFn } from '@angular/router';

export const roomGuard: CanActivateFn = (route, state) => {
  return true;
};
