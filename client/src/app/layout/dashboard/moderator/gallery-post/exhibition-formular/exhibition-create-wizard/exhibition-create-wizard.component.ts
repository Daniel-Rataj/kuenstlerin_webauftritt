import { Component, ViewChild, OnInit } from '@angular/core';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { ExhibitionBasicFormComponent } from '../exhibition-basic-form/exhibition-basic-form.component';
import { ExhibitionElementsUploadComponent } from '../exhibition-elements-upload/exhibition-elements-upload.component';
import { ExhibitionPublishComponent } from '../exhibition-publish/exhibition-publish.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';

@Component({
  selector: 'app-exhibition-create-wizard',
  templateUrl: './exhibition-create-wizard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ExhibitionBasicFormComponent,
    ExhibitionElementsUploadComponent,
    ExhibitionPublishComponent,
  ],
})
export class ExhibitionCreateWizardComponent implements OnInit {
  step = 1;
  exhibitionDraft: ExhibitionDto;
  metadataList: ExhibitionElement[] = [];

  @ViewChild(ExhibitionBasicFormComponent)
  basicFormComponent!: ExhibitionBasicFormComponent;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly exhibitionService: ExhibitionService
  ) {
    this.exhibitionDraft = ExhibitionDto.createEmptyExhibition();
  }

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      try {
        const exhibition = await this.exhibitionService.getByIdAsync(id);
        this.exhibitionDraft = exhibition;
        this.metadataList = exhibition.exhibitionElements ?? [];
        this.step = 2; // direkt zum Schritt 2 (Bilder & Metadaten)
      } catch (error) {
        console.error('Fehler beim Laden der Ausstellung zur Bearbeitung:', error);
        this.router.navigate(['/dashboard/moderator/gallery']);
      }
    }
  }

  async handleBasicDataSubmitted(data: Partial<ExhibitionDto>) {
    this.exhibitionDraft = {
      ...this.exhibitionDraft,
      ...data,
      exhibitionElements: this.metadataList,
    };
    this.step = 2;
  }

  submitExhibitionCreationForm(): void {
    this.basicFormComponent.onSubmit();
  }

  assignExhibitionElements(exhibitionElements: ExhibitionElement[]) {
    this.metadataList = exhibitionElements;
    this.step = 3;
  }

  goBack(): void {
    if (this.step > 1) this.step--;
  }

  cancelCreation(): void {
    const confirmed = confirm('Möchtest du die Ausstellung wirklich abbrechen? Nicht gespeicherte Daten gehen verloren.');
    if (confirmed) {
      this.router.navigate(['/dashboard/moderator/gallery']);
      this.exhibitionDraft = ExhibitionDto.createEmptyExhibition();
      this.metadataList = [];
      this.step = 1;
    }
  }

  handleFinished(): void {
    this.router.navigate(['/dashboard/moderator/gallery']);
  }
}
