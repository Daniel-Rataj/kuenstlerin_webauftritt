import { Injectable, inject } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable, from, switchMap, throwError, catchError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly authService = inject(AuthService);
  private readonly browserStorageService = inject(BrowserStorageService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const skipAuth = req.headers.get('skip-auth');
    if (skipAuth === 'true') {
      const cleanHeaders = req.headers.delete('skip-auth');
      const cleanReq = req.clone({ headers: cleanHeaders });
      return next.handle(cleanReq);
    }

    const token = this.browserStorageService.getItem('token');
    if (!token) {
      return next.handle(req);
    }

    if (this.authService.isTokenExpired()) {
      // Wrap Promise in Observable
      return from(this.authService.refreshTokenAsync()).pipe(
        switchMap(newToken => {
          const cloned = this.addToken(req, newToken);
          return next.handle(cloned);
        }),
        catchError(err => {
          console.error('Token refresh failed in interceptor:', err.message);
          this.authService.logout();
          return throwError(() => new Error('Token refresh failed'));
        })
      );
    } else {
      const cloned = this.addToken(req, token);
      return next.handle(cloned);
    }
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
