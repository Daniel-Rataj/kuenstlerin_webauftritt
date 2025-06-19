import { Component, signal } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
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
  exhibitions: ExhibitionDto[] = [];
  private readonly exhibitionsSignal = signal<ExhibitionDto[]>([]);
  openExhibitions: { [id: number]: boolean } = {};
  selectedElement: ExhibitionElement | null = null;

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.initialize();
    console.log('Gallery component initialized');
  }

  async initialize(): Promise<void> {
    const data = await this.exhibitionService.getAllAsync();
    this.exhibitionsSignal.set(data);
  }
}
