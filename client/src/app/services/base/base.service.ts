import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export class BaseService<TRead, TWrite = TRead> {
  protected baseUrl: string;

  constructor(protected http: HttpClient, endpoint: string) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  async getAllAsync(): Promise<TRead[]> {
    try {
      return await firstValueFrom(this.http.get<TRead[]>(this.baseUrl));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getByIdAsync(id: number): Promise<TRead> {
    try {
      return await firstValueFrom(this.http.get<TRead>(`${this.baseUrl}/${id}`));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createAsync(item: TWrite): Promise<TRead> {
    try {
      return await firstValueFrom(this.http.post<TRead>(this.baseUrl, item));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAsync(id: number, item: TWrite): Promise<TRead> {
    try {
      return await firstValueFrom(this.http.put<TRead>(`${this.baseUrl}/${id}`, item));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAsync(id: number): Promise<void> {
    try {
      return await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`));
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: unknown): never {
    if (error instanceof HttpErrorResponse) {
      console.error(`HTTP Error (${error.status}): ${error.message}`);
    } else {
      console.error('Unbekannter Fehler:', error);
    }
    throw error;
  }
}
