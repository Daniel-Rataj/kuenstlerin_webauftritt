import { Component, signal } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';
import { CommonModule } from '@angular/common';
import { ExhibitionGridComponent } from '../../shared/exhibition-grid/exhibition-grid.component';
import { ExhibitionElementsModalComponent } from '../../shared/exhibition-elements-modal/exhibition-elements-modal.component';


@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, ExhibitionGridComponent, ExhibitionElementsModalComponent],
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
  }

  async initialize(): Promise<void> {
    try {
      const data = await this.exhibitionService.getAllPublishedAsync();
      // sort after release date
      data.sort((a, b) => 
        new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime()
      );

      this.exhibitions = data;
    } catch (err) {
      console.error('Fehler beim Laden der Ausstellungen', err);
    }
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
