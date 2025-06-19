import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { ExhibitionDto } from '../../models/dto/exhibition.dto';
import { HttpClient } from '@angular/common/http';
import { ExhibitionElement } from '../../models/dto/exhibition-element.dto';
import { firstValueFrom} from 'rxjs';

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
