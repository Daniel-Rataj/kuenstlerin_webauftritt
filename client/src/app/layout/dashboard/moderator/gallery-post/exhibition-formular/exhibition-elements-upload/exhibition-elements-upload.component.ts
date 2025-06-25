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
  private _exhibitionDraft!: Partial<ExhibitionDto>;

  @Input()
  set exhibitionDraft(value: Partial<ExhibitionDto>) {
    this._exhibitionDraft = value;

    if (value && value.id && value.exhibitionElements && value.exhibitionElements.length > 0) {
      console.log('ExhibitionElements loaded:', value.exhibitionElements);

      value.exhibitionElements.forEach((el, index) => {
        console.log(`Element ${index}: length=${el.length}, width=${el.width}`);
      });

      this.metadataList = value.exhibitionElements.map(el => ({
        ...el,
        imageFile: undefined, // Backend liefert keine Dateiobjekte
      }));
    } else {
      this.metadataList = [];
    }
  }
  get exhibitionDraft(): Partial<ExhibitionDto> {
    return this._exhibitionDraft;
  }

  @Input() metadataList: ExhibitionElement[] = [];

  @Output() exhibitionElementsSubmitted = new EventEmitter<ExhibitionElement[]>();

  constructor(private readonly exhibitionService: ExhibitionService) {}

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.metadataList.push(createEmptyElement(file));
    });

    input.value = '';
  }

  remove(index: number): void {
    this.metadataList.splice(index, 1);
  }

  nextStep(): void {
    if (this.metadataList.length === 0) {
      console.warn('Keine Bilder ausgewählt.');
      return;
    }

    this.exhibitionElementsSubmitted.emit(this.metadataList);
  }

  isValidElement(element: ExhibitionElement): boolean {
    if (!element.name || element.name.trim() === '') return false;
    if (!element.description || element.description.trim() === '') return false;
    if (element.length == null || element.length <= 0) return false;
    if (element.width == null || element.width <= 0) return false;
    if (!element.imageFile && !element.imageUrl) return false;
    return true;
  }

  isUploadAllowed(): boolean {
    if (this.metadataList.length === 0) {
      return false;
    }
    return this.metadataList.every((el) => this.isValidElement(el));
  }

  showLengthError(element: ExhibitionElement): boolean {
    return element.length == null || element.length <= 0;
  }

  showWidthError(element: ExhibitionElement): boolean {
    return element.width == null || element.width <= 0;
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
