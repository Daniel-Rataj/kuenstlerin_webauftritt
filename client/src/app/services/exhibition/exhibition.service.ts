import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ExhibitionDto } from '../../models/dto/exhibition.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ExhibitionElement } from '../../models/dto/exhibition-element.dto';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ExhibitionService extends BaseService<
  ExhibitionDto,
  ExhibitionDto
> {
  constructor(http: HttpClient) {
    super(http, 'exhibition');
  }

  async getAllPublishedAsync(): Promise<ExhibitionDto[]> {
    const headers = new HttpHeaders({ 'skip-auth': 'true' });

    const getAllPublishedUrl = `${this.baseUrl}/getAllPublished`;

    try {
      const exhibitions = await firstValueFrom(this.http.get<ExhibitionDto[]>(getAllPublishedUrl, { headers }));
      return exhibitions.map((exhibition) => ({
        ...exhibition,
        exhibitionElements: exhibition.exhibitionElements.map((el) => ({
          ...el,
          imageUrl: this.getFullImageUrl(el.imageUrl),
        })),
      }));
    } catch (error) {
      console.error('Fehler beim Laden der veröffentlichten Ausstellungen: ', error);
      throw error;
    }
  }

  private getFullImageUrl(imageUrl: string): string {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;

    // Wenn es sich um einen statischen Pfad wie /uploads/... handelt, KEIN /api
    return `${environment.serverBaseUrl}${imageUrl}`;
}

  async uploadElementsBulk(id: number, elements: ExhibitionElement[]): Promise<ExhibitionDto> {
    const url = `${this.baseUrl}/${id}/elements/bulk`;
    const formData = new FormData();

    // Dateien hinzufügen
    for (const el of elements) {
      if (el.imageFile) {
        formData.append('files', el.imageFile);
      }
    }

    // Metadaten (ohne imageFile) hinzufügen
    const metadata = elements.map((el) => ({
      name: el.name,
      description: el.description,
      availableToBuy: el.availableToBuy,
      priceTag: el.priceTag,
    }));

    formData.append('exhibitionElementsJson', JSON.stringify(metadata));

    try {
      return await firstValueFrom(this.http.post<ExhibitionDto>(url, formData));
    } catch (error) {
      console.error('Fehler beim Hochladen der Ausstellungselemente:', error);
      throw error;
    }
  }

  async publishAsync(id: number, item: ExhibitionDto): Promise<void> {
    this.http.post<ExhibitionDto>(`/api/exhibitions/publish/${id}`, item);
  }
}
