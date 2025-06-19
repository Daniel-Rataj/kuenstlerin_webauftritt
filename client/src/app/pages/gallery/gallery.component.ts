import { Component, signal } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../models/dto/exhibition.dto';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  exhibitions: ExhibitionDto[] = [];
  private readonly exhibitionsSignal = signal<ExhibitionDto[]>([]);

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
