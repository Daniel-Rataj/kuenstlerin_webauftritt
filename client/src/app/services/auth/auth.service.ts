// src/app/services/auth.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginRequest } from '../../models/requests/login.request';
import { LoginResponse } from '../../models/responses/login.response';
import { BaseService } from '../base/base.service';
import { User } from '../../models/user';
import { UserRole } from '../../models/enums/user.role';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {

  private readonly currentUser = signal<LoginResponse | null>(null);

  constructor(http: HttpClient) {
  super(http, 'auth');

  if (typeof window !== 'undefined') {
    // Retrieve persisted authentication data from localStorage in case of page reloads
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    // If both user and token are available, restore the currentUser signal to maintain authentication state
    if (token && userStr) {
      const user = JSON.parse(userStr);
      this.currentUser.set({ token, user });
    }
  }
}


  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        this.currentUser.set(response); // Store user data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  isAuthenticated(): boolean {
    // not authenticated if there is no currentUser assigned or none in the localStorage
    return this.currentUser() !== null || localStorage.getItem('token') !== null;
  }

  getUserRole(): UserRole | null {
    const user = this.currentUser()?.user || JSON.parse(localStorage.getItem('user') ?? 'null');
    let currentUserRole;

    if(user?.role !== undefined) {
      currentUserRole = user.role as UserRole
    } else {
      currentUserRole = null;
    }
    return currentUserRole;
  }
  
  hasRole(requiredRole: UserRole): boolean {
    const userRole = this.getUserRole();
    return userRole !== null && userRole === requiredRole;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
