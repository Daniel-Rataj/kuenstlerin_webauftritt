import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../models/enums/user-role';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    const userRole = authService.getUserRole();

    if (userRole !== null && allowedRoles.includes(userRole)) {
      return true;
    }
    router.navigate(['/login']);
    return false;
  };
};