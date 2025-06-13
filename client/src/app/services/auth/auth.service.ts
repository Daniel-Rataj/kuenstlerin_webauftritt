import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { BaseService } from '../base/base.service';
import { User } from '../../models/user';
import { LoginRequestDto } from '../../models/dto/login-request.dto';
import { UserSession } from '../../models/user-session';
import { UserRole } from '../../models/enums/user.role';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService<User> {
  
  // Holds the currently logged-in user and token as a reactive signal
  private readonly currentUserAuth = signal<UserSession | null>(null);

  constructor(http: HttpClient) {
    super(http, 'auth');
    // Initializes base URL segment for auth API endpoints

    if (typeof window !== 'undefined') {
      // Ensures code runs only in browser (e.g., not during SSR)
      const token = localStorage.getItem('token') ?? '';
      const refreshToken = localStorage.getItem('refreshToken') ?? '';
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          // Restores session from localStorage on app start
          this.currentUserAuth.set({ token, refreshToken, user });
        } catch (e) {
          console.error('Fehler beim Parsen von user in localStorage:', e);
          this.currentUserAuth.set(null);
        }
      }
    }
  }

  private getUserFromLocalStorage(): User | null {
    // Retrieves and parses user data from localStorage
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      console.error('Fehler beim Parsen von user in localStorage:', e);
      return null;
    }
  }

  private decodeToken(token: string): any {
    // Decodes a JWT and returns its payload
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Ungültiger Token:', e);
      return null;
    }
  }

  public login(credentials: LoginRequestDto): Observable<UserSession> {
    // Sends login request and stores token and user on success
    return this.http.post<UserSession>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.currentUserAuth.set(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
      catchError(err => {
        console.error('Login-Fehler:', err);
        return throwError(() => new Error('Login fehlgeschlagen.'));
      })
    );
  }

  public logout(): void {
    // Clears user session and token from memory and localStorage
    this.currentUserAuth.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public isAuthenticated(): boolean {
    // Returns true if a valid, non-expired token exists
    const token = this.currentUserAuth()?.token ?? localStorage.getItem('token');
    return !!token && !this.isTokenExpired();
  }

  public refreshToken(): Observable<string> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return throwError(() => new Error('Kein Refresh Token vorhanden.'));
    }

    return this.http.post<UserSession>(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
      tap(response => {
        this.currentUserAuth.set(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('user', JSON.stringify(response.user));
      }),
      map(response => response.token),
      catchError(err => {
        this.logout();
        return throwError(() => new Error('Refresh fehlgeschlagen.'));
      })
    );
  }

  public isTokenExpired(): boolean {
    // Checks whether the current token is expired
    const token = this.currentUserAuth()?.token ?? localStorage.getItem('token');
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    return decoded.exp < now;
  }

  

  public getUser(): User {
    // Returns the current user or throws if not available
    const user = this.currentUserAuth()?.user ?? this.getUserFromLocalStorage();

    if (!user) {
      throw new Error('Kein eingeloggter Benutzer gefunden.');
    }

    return user;
  }

  public getUserId(): number {
    // Retrieves the logged-in user's ID or throws if invalid
    const id = this.getUser().id;
    if (typeof id !== 'number') {
      throw new Error('Benutzer-ID fehlt oder ungültig.');
    }
    return id;
  }

  public getUserRole(): UserRole {
    // Retrieves the logged-in user's role or throws if unavailable
    const role = this.getUser().role;
    if (!role) {
      throw new Error('Benutzerrolle nicht verfügbar.');
    }
    return role;
  }

  public hasRole(required: UserRole): boolean {
    // Checks if the user has the specified role
    return this.getUserRole() === required;
  }
}

