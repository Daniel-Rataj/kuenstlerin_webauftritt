import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionService } from '../../../../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../../../../models/dto/exhibition.dto';
import { RouterModule, Router } from '@angular/router';
import { ExhibitionStatus } from '../../../../../models/enums/exhibition-status';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { PostListComponent } from '../../../shared/post-list/post-list.component';
import { PostListAction } from '../../../shared/configs/post-list-action';
import { PostListAddConfig } from '../../../shared/configs/post-list-add-button';
import { PostListHost } from '../../../shared/configs/post-list';
import { PostListActionItemComponent } from '../../../shared/post-list-action-item/post-list-action-item.component';

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
export class ExhibitionListComponent implements PostListHost<ExhibitionDto>, OnInit {
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

  reloadPage() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl(currentUrl + '?refresh', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  // Action handlers
  navigateToEdit(id: number): void {
    this.router.navigate(['/dashboard/moderator/exhibition', id]);
  }

  navigateToCreate(): void {
    this.router.navigate(['/dashboard/moderator/exhibition/create']);
  }

  async publishExhibitionWithDraft(exhibition: ExhibitionDto): Promise<void> {
    exhibition.status = ExhibitionStatus.Public;
    this.selectedExhibition = exhibition;
    await this.exhibitionService.publishAsync(exhibition.id!, exhibition);
    this.loadExhibitions();
  }

  //#region confirm-dialog
  openConfirmDeleteModal(exhibition: ExhibitionDto): void {
    this.selectedExhibition = exhibition;
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
  //#endregion
  
  // Filtered subsets
  drafts(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Draft);
  }

  published(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Public);
  }
  
  //#region Simplified display helpers for PostListComponent bindings
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
  getBadgeClass(exhibition: ExhibitionDto): string {
    return exhibition.status === ExhibitionStatus.Draft ? 'bg-secondary' : 'bg-success';
  }
  getElementCount = (e: ExhibitionDto) => e.exhibitionElements?.length ?? 0;

  // Config for actions and button
  getDraftActions(): PostListAction<ExhibitionDto>[] {
    const editAction: PostListAction<ExhibitionDto> = {
        label: 'Bearbeiten',
        iconClass: 'fa-solid fa-pen-to-square',
        action: (e) => this.navigateToEdit(e.id!)
    };

    const publishAction: PostListAction<ExhibitionDto> = {
      label: 'Veröffentlichen',
      iconClass: 'fa-solid fa-upload',
      action: (e) => this.publishExhibitionWithDraft(e)
    };

    const deleteAction: PostListAction<ExhibitionDto> = {
      label: 'Löschen',
      iconClass: 'fa-solid fa-trash',
      isDanger: true,
      action: (e) => this.openConfirmDeleteModal(e)
    }
    return [editAction, publishAction, deleteAction]
  }

  getPublishedActions(): PostListAction<ExhibitionDto>[] {
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
  //#endregion
}
