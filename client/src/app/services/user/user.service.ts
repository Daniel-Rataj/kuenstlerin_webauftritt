import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService<User, UserDto> extends BaseService<User, UserDto> {
  constructor(http: HttpClient) {
    super(http, 'user');
  }

  async getById(id: string): Promise<User> {
      try {
        return await firstValueFrom(this.http.get<User>(`${this.baseUrl}/${id}`));
      } catch (error) {
        return this.handleError(error);
      }
  }

  async update(id: string, item: UserDto): Promise<User> {
    try {
      return await firstValueFrom(this.http.put<User>(`${this.baseUrl}/${id}`, item));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
    } catch (error) {
      return this.handleError(error);
    }
  }
}
