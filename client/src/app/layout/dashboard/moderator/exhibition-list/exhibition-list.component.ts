import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionService } from '../../../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../../../models/dto/exhibition.dto';

@Component({
  selector: 'app-exhibition-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exhibition-list.component.html',
  styleUrls: ['./exhibition-list.component.scss']
})

export class ExhibitionListComponent {
  exhibitions = signal<ExhibitionDto[]>([]);

  constructor(private readonly exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize(): Promise<void> {
    const data = await this.exhibitionService.getAllAsync();
    this.exhibitions.set(data);
  }
}
