import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { BaseService } from '../base/base.service';
import { User } from '../../models/user';
import { LoginRequestDto } from '../../models/dto/login-request.dto';
import { UserSession } from '../../models/user-session';
import { UserRole } from '../../models/enums/user-role';
import { AuthHelper } from '../../helper/auth.helper';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<User> {
  
  // Holds the currently logged-in user and token as a reactive signal
  private readonly currentUserSession = signal<UserSession | null>(null);

  constructor(http: HttpClient, private readonly browserStorageService: BrowserStorageService) {
    super(http, 'auth');

    const token = this.browserStorageService.getItem('token') ?? '';
    const refreshToken = this.browserStorageService.getItem('refreshToken') ?? '';
    const userStr = this.browserStorageService.getItem('user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSession.set({ token, refreshToken, user });
      } catch (e) {
        console.error('Fehler beim Parsen von user in localStorage:', e);
        this.currentUserSession.set(null);
      }
    }
  }

  async loginAsync(credentials: LoginRequestDto): Promise<UserSession> {
    const headers = new HttpHeaders({ 'skip-auth': 'true' });

    try {
      const response = await firstValueFrom(
        this.http.post<UserSession>(`${this.baseUrl}/login`, credentials, { headers })
      );

      this.currentUserSession.set(response);
      this.browserStorageService.setItem('token', response.token);
      this.browserStorageService.setItem('refreshToken', response.refreshToken);
      this.browserStorageService.setItem('user', JSON.stringify(response.user));

      return response;
    } catch (error) {
      console.error('Login-Fehler:', error);
      throw new Error('Login fehlgeschlagen.');
    }
  }

  public logout(): void {
    // Clears user session and token from memory and localStorage
    this.currentUserSession.set(null);
    this.browserStorageService.removeItem('token');
    this.browserStorageService.removeItem('user');
  }

  public isAuthenticated(): boolean {
    // Returns true if a valid, non-expired token exists
    const token = this.currentUserSession()?.token ?? this.browserStorageService.getItem('token');
    return !!token && !this.isTokenExpired();
  }

  async refreshTokenAsync(): Promise<string> {
    const refreshToken = this.browserStorageService.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('Kein Refresh Token vorhanden.');
    }

    const headers = new HttpHeaders({ 'skip-auth': 'true' });

    try {
      const response = await firstValueFrom(
        this.http.post<UserSession>(`${this.baseUrl}/refresh`, { refreshToken }, { headers })
      );

      this.currentUserSession.set(response);
      this.browserStorageService.setItem('token', response.token);
      this.browserStorageService.setItem('refreshToken', response.refreshToken);
      this.browserStorageService.setItem('user', JSON.stringify(response.user));

      return response.token;
    } catch (error) {
      this.logout();
      console.error('Fehler beim Token-Refresh:', error);
      throw new Error('Refresh fehlgeschlagen.');
    }
  }

  public isTokenExpired(): boolean {
    // Checks whether the current token is expired
    const token = this.currentUserSession()?.token ?? this.browserStorageService.getItem('token');
    return AuthHelper.isTokenExpired(token);
  }

  public getUser(): User {
    // Returns the current user or throws if not available
    const user = AuthHelper.getUser(this.currentUserSession(), this.browserStorageService)

    if (!user) {
      throw new Error('Kein eingeloggter Benutzer gefunden.');
    }

    return user;
  }

  public getUserRole(): UserRole {
    // Retrieves the logged-in user's role or throws if unavailable
    const role = AuthHelper.getUserRole(this.currentUserSession(), this.browserStorageService);
    if (!role) {
      throw new Error('Benutzerrolle nicht verfügbar.');
    }
    return role;
  }
}

