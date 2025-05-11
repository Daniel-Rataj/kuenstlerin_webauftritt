// src/app/services/base.service.ts
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export class BaseService<T> {
  protected baseUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${id}`);
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(id: number, item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${id}`, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
