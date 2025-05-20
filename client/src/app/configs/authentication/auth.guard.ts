import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CanActivateFn, Router } from '@angular/router';

// This guard checks if a user is logged in (any role)
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    console.info('isAuthenticated: ' + authService.isAuthenticated())
    router.navigate(['/login']); // Redirect to login if not authenticated
    return false;
  }
  return true;
};