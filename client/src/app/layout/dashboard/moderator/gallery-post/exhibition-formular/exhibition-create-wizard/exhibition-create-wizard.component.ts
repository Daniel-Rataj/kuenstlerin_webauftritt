import { Component, ViewChild, OnInit } from '@angular/core';
import { ExhibitionDto } from '../../../../../../models/dto/exhibition.dto';
import { ExhibitionService } from '../../../../../../services/exhibition/exhibition.service';
import { CommonModule } from '@angular/common';
import { ExhibitionBasicFormComponent } from '../exhibition-basic-form/exhibition-basic-form.component';
import { ExhibitionElementsUploadComponent } from '../exhibition-elements-upload/exhibition-elements-upload.component';
import { ExhibitionPublishComponent } from '../exhibition-publish/exhibition-publish.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ExhibitionElement } from '../../../../../../models/dto/exhibition-element.dto';
import { DashboardToolbarComponent } from '../../../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { DashboardHeaderComponent } from '../../../../shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-exhibition-create-wizard',
  templateUrl: './exhibition-create-wizard.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ExhibitionBasicFormComponent,
    ExhibitionElementsUploadComponent,
    ExhibitionPublishComponent,
    DashboardHeaderComponent,
    DashboardToolbarComponent
  ],
})
export class ExhibitionCreateWizardComponent implements OnInit {
  step = 1;
  exhibitionDraft: ExhibitionDto;
  metadataList: ExhibitionElement[] = [];
  isEditMode = false;
  initialElementIds: number[] = [];

  // ViewChilds
  @ViewChild(ExhibitionElementsUploadComponent)
  uploadStepComponent?: ExhibitionElementsUploadComponent;


  @ViewChild(ExhibitionBasicFormComponent)
  basicFormComponent!: ExhibitionBasicFormComponent;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly exhibitionService: ExhibitionService
  ) {
    this.exhibitionDraft = ExhibitionDto.createEmptyExhibition();
  }

  ngOnInit(): void{
    this.initialize();
  }

  async initialize(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      const id = Number(idParam);
      this.isEditMode = true; // Edit mode enabled if an ID is present in the route

      try {
        const exhibition = await this.exhibitionService.getByIdAsync(id);
        this.exhibitionDraft = exhibition;
        this.metadataList = exhibition.exhibitionElements ?? [];

        // Store original element IDs to detect deletions later
        this.initialElementIds = this.metadataList.map(el => el.id!).filter(Boolean);

        this.step = 1; // Always start at step 1, even when editing
      } catch (error) {
        console.error('Failed to load exhibition for editing:', error);
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

  proceedFromUploadStep(): void {
    if (!this.uploadStepComponent) return;

    if (!this.uploadStepComponent.isUploadAllowed()) {
      console.warn('Upload nicht erlaubt');
      return;
    }

    this.uploadStepComponent.nextStep();
  }

  // Returns a list of element IDs that were originally present but have been removed in the current state
  getDeletedElementIds(): number[] {
    const currentIds = this.metadataList.filter(el => el.id).map(el => el.id!);
    return this.initialElementIds.filter(id => !currentIds.includes(id));
  }

  // Cancel: Go back to exhibition-list view
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
