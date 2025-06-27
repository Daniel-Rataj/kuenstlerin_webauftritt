import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { ExhibitionStatus } from '../../../../../../models/enums/exhibition-status';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-exhibition-publish',
  templateUrl: './exhibition-publish.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ExhibitionPublishComponent {
  @Input() exhibitionDraft!: ExhibitionDto;
  @Input() metadataList!: ExhibitionElement[];
  @Input() isEditMode = false;
  @Input() deletedElementIds: number[] = [];

  @Output() submitFinishedExhibition = new EventEmitter<ExhibitionDto>();
  @Output() finished = new EventEmitter<void>();

  ExhibitionStatus = ExhibitionStatus;
  isLoading = false;

  private createdExhibition: ExhibitionDto;

  constructor(
    private readonly exhibitionService: ExhibitionService,
    private readonly router: Router
  ) {
    this.createdExhibition = ExhibitionDto.createEmptyExhibition();
  }

  /**
   * Main entry point for saving or publishing the exhibition.
   * Handles create/update, new elements, updated elements and deletions.
   */
  async saveExhibition(status: ExhibitionStatus): Promise<void> {
    if (!this.exhibitionDraft) return;
    this.isLoading = true;

    try {
      this.exhibitionDraft.status = status;

      await this.createOrUpdateExhibition();
      await this.uploadNewElements();
      await this.updateChangedElements();
      await this.deleteRemovedElements();

      this.submitFinishedExhibition.emit(this.createdExhibition);
      this.finished.emit();
    } catch (error) {
      console.error('Error saving exhibition:', error);
    } finally {
      this.isLoading = false;
      this.router.navigate(['dashboard/moderator/gallery']);
    }
  }

  /**
   * Creates the exhibition if new, otherwise updates the base information.
   */
  private async createOrUpdateExhibition(): Promise<void> {
    if (!this.exhibitionDraft.id) {
      this.createdExhibition = await this.exhibitionService.createAsync({
        ...this.exhibitionDraft,
        exhibitionElements: [],
      });
    } else {
      this.createdExhibition = await this.exhibitionService.updateAsync(
        this.exhibitionDraft.id,
        {
          ...this.exhibitionDraft,
          exhibitionElements: [],
          status: this.exhibitionDraft.status,
        }
      );
    }
  }

  /**
   * Uploads newly added elements with image files.
   */
  private async uploadNewElements(): Promise<void> {
    const newElements = this.metadataList.filter(el => !el.id && el.imageFile);
    if (newElements.length) {
      await this.exhibitionService.uploadElementsBulk(this.createdExhibition.id!, newElements);
    }
  }

  /**
   * Sends updated existing elements (without image file) to backend for persistence.
   */
  private async updateChangedElements(): Promise<void> {
    const updatedElements = this.metadataList.filter(
      el => el.id && !el.imageFile && this.isDirty(el)
    );
    if (updatedElements.length) {
      await this.exhibitionService.updateExhibitionElementsBulk(this.createdExhibition.id!, updatedElements);
    }
  }

  /**
   * Deletes removed elements (tracked by ID) from backend and server.
   */
  private async deleteRemovedElements(): Promise<void> {
    if (this.isEditMode && this.deletedElementIds.length) {
      await this.exhibitionService.deleteExhibitionElementsBulk(this.createdExhibition.id!, this.deletedElementIds);
    }
  }

  /**
   * Compares current state of an element with its original snapshot to detect changes.
   */
  private isDirty(element: ExhibitionElement): boolean {
    const original = (element as any)._original;
    if (!original) return false;

    return (
      element.name !== original.name ||
      element.description !== original.description ||
      element.availableToBuy !== original.availableToBuy ||
      element.length !== original.length ||
      element.width !== original.width ||
      element.priceTag !== original.priceTag
    );
  }
}
