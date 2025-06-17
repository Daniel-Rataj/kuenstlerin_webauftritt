import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionService } from '../../../../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../../../../models/dto/exhibition.dto';
import { RouterModule } from '@angular/router';
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

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.initialize();
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

  getFormattedDate(date: Date): string {
    return new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getElementCount(exhibition: ExhibitionDto): number {
    return exhibition.exhibitionElements?.length ?? 0;
  }
}