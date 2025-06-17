import { Component } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { Exhibition } from '../../models/exhibition';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';
import { NgFor, NgIf, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, NgIf, DatePipe, NgClass],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  exhibitions: Exhibition[] = [];
  openExhibitions: { [id: number]: boolean } = {};
  selectedElement: ExhibitionElement | null = null;

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.exhibitions = this.exhibitionService.getExhibitionsDummy();
  }

  toggleExhibition(id: number): void {
    this.openExhibitions[id] = !this.openExhibitions[id];
  }

  isExhibitionOpen(id: number): boolean {
    return !!this.openExhibitions[id];
  }

  // Modal öffnen mit Bildinfos
  openModal(element: ExhibitionElement): void {
    this.selectedElement = element;
  }

  // Modal schließen
  closeModal(): void {
    this.selectedElement = null;
  }
}
