import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { ExhibitionStatus } from '../../../../../../models/enums/exhibition-status';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';

@Component({
  selector: 'app-exhibition-publish',
  templateUrl: './exhibition-publish.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ExhibitionPublishComponent {
  @Input() exhibitionDraft!: ExhibitionDto;
  @Input() metadataList!: ExhibitionElement[]; // exhibitionDraft from Wizard/Parent
  @Output() submitFinishedExhibition = new EventEmitter<ExhibitionDto>();
  ExhibitionStatus = ExhibitionStatus;
  isLoading = false;

  private createdExhibition: ExhibitionDto

  constructor(private readonly exhibitionService: ExhibitionService) {
    this.createdExhibition = ExhibitionDto.createEmptyExhibition()
  } 

  async saveExhibition(status: ExhibitionStatus): Promise<void> {
    if (!this.exhibitionDraft) return;
    this.isLoading = true;

    try {
      // 1. Setze Status
      this.exhibitionDraft.status = status;

      // 2. Erstelle Exhibition, falls keine ID vorhanden
      if (!this.exhibitionDraft.id) {
        this.createdExhibition = await this.exhibitionService.createAsync({
          ...this.exhibitionDraft,
          exhibitionElements: [], // wichtig: ohne imageFile
        });
      } else {
        this.createdExhibition = this.exhibitionDraft;
      }

      // 3. Upload ExhibitionElements (FormData mit Bildern)
      if (this.metadataList?.length) {
        console.log('Elemente vor Backend während publish component:', this.metadataList);
        await this.exhibitionService.uploadElementsBulk(
          this.createdExhibition.id!,
          this.metadataList
        );
      }

      // 4. Update oder Publish je nach Status
      if (status === ExhibitionStatus.Public) {
        await this.exhibitionService.publishAsync(
          this.createdExhibition.id!,
          this.createdExhibition
        );
      } else {
        this.createdExhibition = await this.exhibitionService.updateAsync(
          this.createdExhibition.id!,
          { ...this.createdExhibition, status }
        );
      }

      // 5. Rückmeldung
      this.submitFinishedExhibition.emit(this.createdExhibition);
    } catch (error) {
      console.error('Fehler bei der Speicherung der Ausstellung mit AusstellungsElementen:', error);
    } finally {
      this.isLoading = false;
    }
  }
}