import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';

@Component({
  selector: 'app-exhibition-elements-upload',
  templateUrl: './exhibition-elements-upload.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class ExhibitionElementsUploadComponent {
  @Input() exhibitionDraft!: Partial<ExhibitionDto>; // exhibitionDraft from Wizard/Parent
  @Output() exhibitionElementsSubmitted = new EventEmitter<ExhibitionElement[]>();

  metadataList: ExhibitionElement[] = [];

  constructor(private readonly exhibitionService: ExhibitionService) {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.metadataList.push(createEmptyElement(file));
    });

    input.value = ''; // Reset file input
  }

  remove(index: number): void {
    this.metadataList.splice(index, 1);
  }

  nextStep(): void {
    if (!this.metadataList.length) {
      console.warn('Keine Bilder ausgewählt.');
      return;
    }

    this.exhibitionElementsSubmitted.emit(this.metadataList);
  }

  isValidElement(element: ExhibitionElement): boolean {
    if (!element.name || element.name.trim() === '') return false;
    if (!element.description || element.description.trim() === '') return false;
    if (element.length == null || element.length === 0) return false;
    if (element.width == null || element.width === 0) return false;
    return true;
  }

  isUploadAllowed(): boolean {
    if (this.metadataList.length === 0) {
      return false;
    }
    return this.metadataList.every((el) => this.isValidElement(el));
  }

  showLengthError(element: ExhibitionElement): boolean {
    return (element.length == null || element.length === 0)
  }

  showWidthError(element: ExhibitionElement): boolean {
    return (element.width == null || element.width === 0)
  }
}

function createEmptyElement(file: File): ExhibitionElement {
  return {
    name: '',
    description: '',
    availableToBuy: false,
    imageFile: file,
    imageUrl: '',
    exhibitionId: 0,
    priceTag: undefined,
    width: 0,
    length: 0,
  };
}
