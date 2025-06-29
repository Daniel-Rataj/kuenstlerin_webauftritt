import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './configs/authentication/auth.interceptor';

export const appConfig: ApplicationConfig = {
   providers: [
    provideRouter(routes),
    AuthInterceptor,
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
