import { Component } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { Exhibition } from '../../models/exhibition';
import { NgFor, NgIf, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, NgClass],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  exhibitions: Exhibition[] = [];
  openedExhibitionId: number | null = null;

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.exhibitions = this.exhibitionService.getExhibitionsDummy();
  }

  toggleExhibition(id: number): void {
    this.openedExhibitionId = this.openedExhibitionId === id ? null : id;
  }

  isExhibitionOpen(id: number): boolean {
    return this.openedExhibitionId === id;
  }
}
