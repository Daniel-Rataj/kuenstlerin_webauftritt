import { Component, ViewChild } from '@angular/core';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { ExhibitionBasicFormComponent } from '../exhibition-basic-form/exhibition-basic-form.component';
import { ExhibitionElementsUploadComponent } from '../exhibition-elements-upload/exhibition-elements-upload.component';
import { ExhibitionPublishComponent } from '../exhibition-publish/exhibition-publish.component';
import { Router } from '@angular/router';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';
import { DashboardToolbarComponent } from '../../../../shared/dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'app-exhibition-create-wizard',
  templateUrl: './exhibition-create-wizard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ExhibitionBasicFormComponent,
    ExhibitionElementsUploadComponent,
    ExhibitionPublishComponent,
    DashboardToolbarComponent
  ],
})
export class ExhibitionCreateWizardComponent {
  step = 1;
  exhibitionDraft: ExhibitionDto;
  metadataList: ExhibitionElement[] = [];

  // ViewChilds

  @ViewChild(ExhibitionElementsUploadComponent)
  uploadStepComponent?: ExhibitionElementsUploadComponent;


  @ViewChild(ExhibitionBasicFormComponent)
  basicFormComponent!: ExhibitionBasicFormComponent;

  constructor(private readonly router: Router, private readonly exhibitionService: ExhibitionService) {
    this.exhibitionDraft = ExhibitionDto.createEmptyExhibition()
  }

  async handleBasicDataSubmitted(data: Partial<ExhibitionDto>) {
    // Ensure that the mandatory propertys are set
    const draft: ExhibitionDto = {
      title: data.title ?? '',
      date: data.date ?? new Date(),
      exhibitionElements: [],
      status: 1,
    };

    this.exhibitionDraft = draft;
    this.step = 2;
  }

  submitExhibitionCreationForm(): void {
    this.basicFormComponent.onSubmit();
  }

  assignExhibitionElements(exhibitionElements: ExhibitionElement[]) {   
    this.metadataList = exhibitionElements;
    this.step = 3;
  }

  // Step backward
  goBack(): void {
    if (this.step > 1) this.step--;
  }

  proceedFromUploadStep(): void {
    if (!this.uploadStepComponent) return;

    if (!this.uploadStepComponent.isUploadAllowed()) {
      console.warn('Upload nicht erlaubt');
      return;
    }

    this.uploadStepComponent.nextStep();
  }


  // Cancel: Go back to exhibition-list view
  cancelCreation(): void {
    const confirmed = confirm('Möchtest du die Ausstellung wirklich abbrechen? Nicht gespeicherte Daten gehen verloren.');
    if (confirmed) {
      this.router.navigate(['/dashboard/moderator/gallery']);
      this.exhibitionDraft = ExhibitionDto.createEmptyExhibition();
      this.step = 1;
    }
  }
}
