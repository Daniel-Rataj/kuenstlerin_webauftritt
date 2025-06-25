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
  @Output() submitFinishedExhibition = new EventEmitter<ExhibitionDto>();
  @Output() finished = new EventEmitter<void>();

  ExhibitionStatus = ExhibitionStatus;
  isLoading = false;

  private createdExhibition: ExhibitionDto;

  constructor(
    private readonly exhibitionService: ExhibitionService, private readonly router: Router
  ) {
    this.createdExhibition = ExhibitionDto.createEmptyExhibition();
  }

  async saveExhibition(status: ExhibitionStatus): Promise<void> {
    if (!this.exhibitionDraft) return;
    this.isLoading = true;

    try {
      this.exhibitionDraft.status = status;

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
            status: status
          }
        );
      }

      if (this.metadataList?.length) {
        await this.exhibitionService.uploadElementsBulk(
          this.createdExhibition.id!,
          this.metadataList
        );
      }

      this.submitFinishedExhibition.emit(this.createdExhibition);
      this.finished.emit();

    } catch (error) {
      console.error('Fehler beim Speichern der Ausstellung:', error);
    } finally {
      this.isLoading = false;
      this.router.navigate(["dashboard/moderator/gallery"]);
    }
  }
}
