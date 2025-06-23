// src/app/services/auth/auth.helper.ts

import { BrowserStorageService } from '../services/browser-storage/browser-storage.service';
import { UserRole } from '../models/enums/user-role';
import { User } from '../models/user';
import { UserSession } from '../models/user-session';

export namespace AuthHelper {
  export function decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Ungültiger token:', e);
      return null;
    }
  }

  export function isTokenExpired(token: string | null): boolean {
    if (!token) return true;

    const decoded = decodeToken(token);
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  export function getUserFromLocalStorage(browserStorageService: BrowserStorageService): User | null {
    try {
      const userStr = browserStorageService.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Fehler beim parsen des Users aus dem LocalStorage:', e);
      return null;
    }
  }

  export function getUser(session: UserSession | null, browserStorageService: BrowserStorageService): User | null {
    return session?.user ?? getUserFromLocalStorage(browserStorageService);
  }

  export function getUserRole(session: UserSession | null, browserStorageService: BrowserStorageService): UserRole | null {
    const user = getUser(session, browserStorageService);
    return user?.role ?? null;
  }
}
