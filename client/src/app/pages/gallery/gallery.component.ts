import { Component } from '@angular/core';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto } from '../../models/dto/exhibition.dto';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  exhibitions: ExhibitionDto[] = [];

  constructor(private readonly exhibitionService: ExhibitionService) {}

   ngOnInit(): void {
    this.exhibitions = this.exhibitionService.getExhibitionsDummy()
    console.log(this.exhibitions)
  }
}
