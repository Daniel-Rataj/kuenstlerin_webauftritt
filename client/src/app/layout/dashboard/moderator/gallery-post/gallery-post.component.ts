import { Component } from '@angular/core';
import { ExhibitionListComponent } from './exhibition-list/exhibition-list.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExhibitionCreateWizardComponent } from './exhibition-formular/exhibition-create-wizard/exhibition-create-wizard.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'app-gallery-post',
  standalone: true,
  imports: [RouterModule, ExhibitionListComponent, ExhibitionCreateWizardComponent, DashboardToolbarComponent],
  templateUrl: './gallery-post.component.html',
  styleUrl: './gallery-post.component.scss'
})
export class GalleryPostComponent {

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  navigateToCreateWizard() {
    this.router.navigate(['/dashboard/moderator/exhibition/create']);
  }

}
