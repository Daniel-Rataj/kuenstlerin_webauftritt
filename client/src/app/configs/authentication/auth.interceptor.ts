// src/app/interceptors/auth.interceptor.ts
import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, switchMap, throwError, catchError } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private readonly authService = inject(AuthService);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.includes('/refresh') || req.url.includes('/login')) {
      // No intercepting or token handling on these endpoints
      return next.handle(req);
    }

    const token = localStorage.getItem('token');
    // Attempts to retrieve the token from localStorage

    if (!token) {
      // If no token is found, pass the request unchanged
      return next.handle(req);
    }

    if (this.authService.isTokenExpired()) {
      // If the token is expired, attempt to refresh it
      return this.authService.refreshToken().pipe(
        switchMap(newToken => {
          // On success, clone the request with the new token and continue
          const cloned = this.addToken(req, newToken);
          return next.handle(cloned);
        }),
        catchError(err => {
          // If refresh fails, propagate an error
          console.error('Token-Erneuerung im Interceptor fehlgeschlagen:', err.message);
          this.authService.logout(); // Make sure to reset session
          return throwError(() => new Error('Token-Erneuerung fehlgeschlagen'));
        })
      );
    } else {
      // If the token is valid, attach it to the request
      const cloned = this.addToken(req, token);
      return next.handle(cloned);
    }
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    // Clones the HTTP request and adds the Authorization header
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
