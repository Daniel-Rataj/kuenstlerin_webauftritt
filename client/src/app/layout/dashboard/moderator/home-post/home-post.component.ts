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
  sections = [
    { id: 0, label: 'Startseite Block 1' },
    { id: 1, label: 'Startseite Block 2' },
    { id: 2, label: 'Startseite Block 3' },
  ];
  constructor(private readonly router: Router) {}

  navigateToAssignment(articleAssignmentId: string) {
    const index = parseInt(articleAssignmentId, 10);
    const sectionLabel = this.sections[index]?.label ?? '';
    this.router.navigate([`/dashboard/moderator/assign/${articleAssignmentId}`], {
      queryParams: { sectionLabel: sectionLabel },
    });
  }
}
