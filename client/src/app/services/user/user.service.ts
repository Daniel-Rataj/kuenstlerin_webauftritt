import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { User } from '../../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService<User, UserDto> extends BaseService<User, UserDto> {
  constructor(http: HttpClient) {
    super(http, 'user');
  }
}
