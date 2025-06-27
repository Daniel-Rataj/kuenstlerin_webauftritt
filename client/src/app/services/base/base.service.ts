import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export class BaseService<TRead, TWrite = TRead> {
  protected baseUrl: string;

  /**
   * Controls whether this service's requests should bypass the AuthInterceptor.
   * Subclasses can override this to true for public APIs.
   */
  protected skipAuth: boolean = false;

  constructor(protected http: HttpClient, endpoint: string) {
    this.baseUrl = `${environment.apiUrl}/${endpoint}`;
  }

  // Centralized header builder
  protected getDefaultHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.skipAuth) {
      headers = headers.set('skip-auth', 'true');
    }
    return headers;
  }

  async getAllAsync(): Promise<TRead[]> {
    try {
      const headers = this.getDefaultHeaders();
      return await firstValueFrom(this.http.get<TRead[]>(this.baseUrl, { headers }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getByIdAsync(id: number): Promise<TRead> {
    try {
      const headers = this.getDefaultHeaders();
      return await firstValueFrom(this.http.get<TRead>(`${this.baseUrl}/${id}`, { headers }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async createAsync(item: TWrite): Promise<TRead> {
    try {
      const headers = this.getDefaultHeaders();
      return await firstValueFrom(this.http.post<TRead>(this.baseUrl, item, { headers }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateAsync(id: number, item: TWrite): Promise<TRead> {
    try {
      const headers = this.getDefaultHeaders();
      return await firstValueFrom(this.http.put<TRead>(`${this.baseUrl}/${id}`, item, { headers }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  async deleteAsync(id: number): Promise<void> {
    try {
      const headers = this.getDefaultHeaders();
      return await firstValueFrom(this.http.delete<void>(`${this.baseUrl}/${id}`, { headers }));
    } catch (error) {
      return this.handleError(error);
    }
  }

  protected handleError(error: unknown, customMessage?: string): never {
    if (error instanceof HttpErrorResponse) {
      if (customMessage) {
        console.error(`HTTP Error ${error.status}): ${customMessage} ${error.message}'`, error);
      } else {
        console.error(`HTTP Error (${error.status}): ${error.message}`, error);
      }
    } else {
        console.error('Unknown Error:', error);
    }
    
    throw error;
  }
}
