// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    if (!authService.isAuthenticated()) {
      router.navigate(['/login']);
      return false;
    }

    // Try get user to validate login (throws if invalid)
    authService.getUser();
    return true;

  } catch (error) {
    console.warn('AuthGuard blockiert Zugriff:', error);
    router.navigate(['/login']);
    return false;
  }
};
