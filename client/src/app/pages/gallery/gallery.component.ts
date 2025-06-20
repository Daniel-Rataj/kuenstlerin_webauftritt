import { Component, signal } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';
import { NgFor, NgIf, DatePipe, NgClass, CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, DatePipe, NgClass],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  exhibitions: ExhibitionDto[] = [];
  private readonly exhibitionsSignal = signal<ExhibitionDto[]>([]);
  openExhibitions: { [id: number]: boolean } = {};
  selectedElement: ExhibitionElement | null = null;

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.initialize();
    console.log('Gallery component initialized');
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

  initialize(): void {
    const data = this.exhibitionService.getExhibitionsDummy();
    this.exhibitions = data;
  }
}
