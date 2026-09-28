import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('accesstoken');
  if (token) {
    return true;
  }
  return router.navigate(['/login']);
};
