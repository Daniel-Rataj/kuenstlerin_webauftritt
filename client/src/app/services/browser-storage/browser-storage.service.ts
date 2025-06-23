// src/app/services/utils/browser-storage.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BrowserStorageService {

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  getItem(key: string): string | null {
    return this.isBrowser() ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser()) {
      localStorage.removeItem(key);
    }
  }

  clear(): void {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }
}
