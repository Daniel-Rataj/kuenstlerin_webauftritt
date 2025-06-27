import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
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
export class ExhibitionElementsUploadComponent implements OnChanges {
  
  // Draft of the exhibition including optional elements list
  @Input() exhibitionDraft!: Partial<ExhibitionDto>;
  
  @Input() isEditMode = false; // Indicates if we are editing an existing exhibition
  
  @Output() exhibitionElementsSubmitted = new EventEmitter<ExhibitionElement[]>();

  metadataList: ExhibitionElement[] = [];
  
  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isEditMode && this.exhibitionDraft?.exhibitionElements?.length) {
      this.metadataList = this.exhibitionDraft.exhibitionElements.map(el => ({
        ...el,
        imageFile: undefined,
        _original: { ...el }, // Store original state for comparison
      }));
    }
  }

  // Handles selection of new files and creates temporary elements for them
  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    Array.from(input.files).forEach((file) => {
      this.metadataList.push(createEmptyElement(file));
    });

    input.value = '';
  }

  // Removes an element from the list by index (used in both create and edit mode)
  remove(index: number): void {
    this.metadataList.splice(index, 1);
  }

  // Emits validated elements and proceeds to next step
  nextStep(): void {
    if (this.metadataList.length === 0) {
      console.warn('No exhibition elements added.');
      return;
    }

    this.exhibitionElementsSubmitted.emit(this.metadataList);
  }

  // Validates each element before proceeding
  isValidElement(element: ExhibitionElement): boolean {
    if (!element.name || element.name.trim() === '') return false;
    if (!element.description || element.description.trim() === '') return false;
    if (element.length == null || element.length <= 0) return false;
    if (element.width == null || element.width <= 0) return false;

    // For new elements, imageFile is required
    if (!element.imageFile && !element.imageUrl) return false;

    return true;
  }

  // Checks if all elements are valid and ready to upload
  isUploadAllowed(): boolean {
    if (this.metadataList.length === 0) {
      return false;
    }
    return this.metadataList.every((el) => this.isValidElement(el));
  }

  // Helpers for validation feedback in the template
  showLengthError(element: ExhibitionElement): boolean {
    return element.length == null || element.length <= 0;
  }

  showWidthError(element: ExhibitionElement): boolean {
    return element.width == null || element.width <= 0;
  }
}

// Factory function to create a blank exhibition element from a selected image file
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
