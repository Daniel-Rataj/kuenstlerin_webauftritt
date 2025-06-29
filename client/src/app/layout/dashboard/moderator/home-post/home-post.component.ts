import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { AssignArticleComponent } from './assign-article/assign-article.component';

@Component({
  selector: 'app-home-post',
  standalone: true,
  templateUrl: './home-post.component.html',
  styleUrls: ['./home-post.component.scss'],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    DashboardHeaderComponent,
    DashboardToolbarComponent,
    AssignArticleComponent,
  ],
})
export class HomePostComponent {
  homepageBlock = [
    { id: 1, placeInHomepage: 'Startseite Block 1' },
    { id: 2, placeInHomepage: 'Startseite Block 2' },
    { id: 3, placeInHomepage: 'Startseite Block 3' },
  ];
  constructor(private readonly router: Router) {}


  navigateToAssignment(index: number) {
    const homepageBlockId = this.homepageBlock[index].id;
    const placeInHomepage = this.homepageBlock[index].placeInHomepage ?? '';
    this.router.navigate([`/dashboard/moderator/assign/${homepageBlockId}`], {
      queryParams: { placeInHomepage: placeInHomepage },
    });
  }
}
