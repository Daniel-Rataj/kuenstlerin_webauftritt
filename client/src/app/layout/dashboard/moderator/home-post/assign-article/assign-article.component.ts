import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../../../services/article/article.service';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { FormsModule } from '@angular/forms';
import { PageRouteMapping } from '../../../../../models/mapping/page-route-mapping';

@Component({
  selector: 'app-assign-article',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardHeaderComponent,
    DashboardToolbarComponent,
  ],
  templateUrl: './assign-article.component.html',
  styleUrl: './assign-article.component.scss',
})
export class AssignArticleComponent implements OnInit {
  articleAssignmentId = '';
  sectionLabel = '';
  articles: string[] = [];
  selectedArticle: string | null = null;
  showButtonOptions = false;
  selectedButtonArticle: string | null = null;
  pageRoutes = PageRouteMapping.routes;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit() {
    this.articleAssignmentId =
      this.route.snapshot.paramMap.get('articleAssignmentId') || '';
    this.sectionLabel =
      this.route.snapshot.queryParamMap.get('sectionLabel') || '';
    // this.articleService.getAll().subscribe(a => this.articles = a);
  }

  saveArticleAssignment() {
    this.router.navigate(['/dashboard/moderator/assignments'])
  }
}
