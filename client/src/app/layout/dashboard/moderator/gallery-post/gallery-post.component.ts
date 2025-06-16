import { Component } from '@angular/core';
import { ExhibitionListComponent } from '../exhibition-list/exhibition-list.component';

@Component({
  selector: 'app-gallery-post',
  standalone: true,
  imports: [ExhibitionListComponent],
  templateUrl: './gallery-post.component.html',
  styleUrl: './gallery-post.component.scss'
})
export class GalleryPostComponent {

}
