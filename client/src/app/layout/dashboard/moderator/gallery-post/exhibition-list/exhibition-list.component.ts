import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionService } from '../../../../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../../../../models/dto/exhibition.dto';
import { RouterModule, Router } from '@angular/router';
import { ExhibitionStatus } from '../../../../../models/enums/exhibition-status';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { PostListComponent } from '../../../shared/post-list/post-list.component';
import { PostListAction } from '../../../shared/configs/post-list-action';
import { PostListAddConfig } from '../../../shared/configs/post-list-add-button';

@Component({
  selector: 'app-exhibition-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostListComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './exhibition-list.component.html',
  styleUrls: ['./exhibition-list.component.scss']
})
export class ExhibitionListComponent {
  private readonly exhibitions = signal<ExhibitionDto[]>([]);
  selectedExhibition?: ExhibitionDto;
  showConfirmDelete = false;

  constructor(
    private readonly exhibitionService: ExhibitionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loadExhibitions();
  }

  async loadExhibitions(): Promise<void> {
    const data = await this.exhibitionService.getAllAsync();
    this.exhibitions.set(data);
  }

  // Filtered subsets
  drafts(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Draft);
  }

  published(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Public);
  }

  // Simplified display helpers for PostListComponent bindings
  getTitle = (e: ExhibitionDto) => e.title;
  getSubtitle = (e: ExhibitionDto) =>
    e.date
      ? new Date(e.date).toLocaleDateString('de-DE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : '';
  getBadge = (e: ExhibitionDto) => ExhibitionStatus.toString(e.status);
  getBadgeClassPublished = (_: ExhibitionDto) => 'bg-success';
  getBadgeClassDraft = (_: ExhibitionDto) => 'bg-secondary';
  getElementCount = (e: ExhibitionDto) => e.exhibitionElements?.length ?? 0;
  

  // Action handlers
  navigateToEdit(id: number): void {
    this.router.navigate(['/dashboard/moderator/exhibition', id]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/dashboard/moderator/exhibition/create']);
  }

  openConfirmDeleteModal(e: ExhibitionDto): void {
    this.selectedExhibition = e;
    this.showConfirmDelete = true;
  }

  closeConfirmDeleteModal(): void {
    this.selectedExhibition = undefined;
    this.showConfirmDelete = false;
  }

  async confirmDelete(): Promise<void> {
    if (!this.selectedExhibition) return;

    await this.exhibitionService.deleteAsync(this.selectedExhibition.id!);
    this.exhibitions.set(
      this.exhibitions().filter(e => e.id !== this.selectedExhibition!.id)
    );
    this.closeConfirmDeleteModal();
  }

  // Config for actions and button
  getExhibitionActions(): PostListAction<ExhibitionDto>[] {
    return [
      {
        label: 'Bearbeiten',
        iconClass: 'fa-solid fa-pen-to-square',
        action: (e) => this.navigateToEdit(e.id!)
      },
      {
        label: 'Löschen',
        iconClass: 'fa-solid fa-trash',
        isDanger: true,
        action: (e) => this.openConfirmDeleteModal(e)
      }
    ];
  }

  getAddButton(): PostListAddConfig {
    return {
      label: 'Neue Ausstellung erstellen',
      action: () => this.navigateToCreate()
    };
  }
}
