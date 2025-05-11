// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/requests/login.request';
import { LoginResponse } from '../models/responses/login.response';
import { BaseService } from './base/base.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService<User> {
  constructor(http: HttpClient) {
    super(http, 'auth'); // → apiUrl/auth
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }
}
