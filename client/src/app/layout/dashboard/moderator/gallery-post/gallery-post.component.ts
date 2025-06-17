import { Component } from '@angular/core';
import { ExhibitionListComponent } from './exhibition-list/exhibition-list.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gallery-post',
  standalone: true,
  imports: [RouterModule, ExhibitionListComponent],
  templateUrl: './gallery-post.component.html',
  styleUrl: './gallery-post.component.scss'
})
export class GalleryPostComponent {

}
