import { Component } from '@angular/core';
import { ExhibitionDto } from '../../../../../models/dto/exhibition.dto';
import { ActivatedRoute } from '@angular/router';
import { ExhibitionService } from '../../../../../services/exhibition/exhibition.service';

@Component({
  selector: 'app-exhibition-details',
  standalone: true,
  imports: [],
  templateUrl: './exhibition-details.component.html',
  styleUrl: './exhibition-details.component.scss'
})
export class ExhibitionDetailComponent implements OnInit {
  exhibition?: ExhibitionDto;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly exhibitionService: ExhibitionService
  ) {}

  ngOnInit(): void {
    // TODO: Ausstellungsdetailseite erstellen
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      this.exhibitionService.getByIdAsync(id).then(exh => this.exhibition = exh);
    }
  }
}
