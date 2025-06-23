import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionService } from '../../../../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../../../../models/dto/exhibition.dto';
import { RouterModule, Router } from '@angular/router';
import { ExhibitionStatus } from '../../../../../models/enums/exhibition-status';
import { PaginationComponent } from '../../../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-exhibition-list',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './exhibition-list.component.html',
  styleUrls: ['./exhibition-list.component.scss']
})
export class ExhibitionListComponent {
  private readonly exhibitions = signal<ExhibitionDto[]>([]);
  draftPage = 0;
  publishedPage = 0;
  pageSize = 5;

  // Variable für die gerade ausgewählte Ausstellung (für Modal)
  selectedExhibition?: ExhibitionDto;

  // Variable, ob das Bestätigungs-Modal sichtbar ist
  showConfirmDelete = false;

  constructor(
    private readonly exhibitionService: ExhibitionService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.initialize();
    console.log('Gallery component initialized');
  }

  async initialize(): Promise<void> {
    const data = await this.exhibitionService.getAllAsync();
    this.exhibitions.set(data);
  }

  drafts(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Draft);
  }

  published(): ExhibitionDto[] {
    return this.exhibitions().filter(e => e.status === ExhibitionStatus.Public);
  }

  getPagedDrafts(): ExhibitionDto[] {
    const start = this.draftPage * this.pageSize;
    return this.drafts().slice(start, start + this.pageSize);
  }

  getPagedPublished(): ExhibitionDto[] {
    const start = this.publishedPage * this.pageSize;
    return this.published().slice(start, start + this.pageSize);
  }

  getStatusLabel(status: ExhibitionStatus): string {
    return ExhibitionStatus.toString(status);
  }

  getFormattedDate(date?: Date): string {
    return date ? new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) : "";
  }

  getElementCount(exhibition: ExhibitionDto): number {
    return exhibition.exhibitionElements?.length ?? 0;
  }

  // Öffnet das Lösch-Bestätigungsmodal und setzt die Ausstellung
  openConfirmDeleteModal(exhibition: ExhibitionDto): void {
    this.selectedExhibition = exhibition;
    this.showConfirmDelete = true;
  }

  // Schließt das Bestätigungsmodal
  closeConfirmDeleteModal(): void {
    this.showConfirmDelete = false;
    this.selectedExhibition = undefined;
  }

  // Löscht die ausgewählte Ausstellung, wenn bestätigt
  async confirmDelete(): Promise<void> {
    if (!this.selectedExhibition) return;

    await this.exhibitionService.deleteAsync(this.selectedExhibition.id!);
    this.exhibitions.set(this.exhibitions().filter(e => e.id !== this.selectedExhibition!.id));

    this.closeConfirmDeleteModal();
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/dashboard/moderator/exhibitions', id]);
  }
}
