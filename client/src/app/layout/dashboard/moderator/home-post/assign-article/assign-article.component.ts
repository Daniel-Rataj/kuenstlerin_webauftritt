import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../../../../services/article/article.service';
import { CommonModule } from '@angular/common';
import { DashboardHeaderComponent } from '../../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { FormsModule } from '@angular/forms';
import { PageRouteMapping } from '../../../../../models/mapping/page-route-mapping';
import { ArticleAssignmentService } from '../../../../../services/articleAssignment/article-assignment.service';
import { CreateArticleAssignmentDto } from '../../../../../models/dto/create-article-assignment.dto';

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
  pageBlockId!: number;
  sectionLabel = '';
  articles: { id: number; title: string }[] = [];
  selectedArticleId: number | null = null;
  showButton = false;
  buttonTargetRoute: string | null = null;
  currentAssignmentId: number | null = null;

  readonly pageRoutes = PageRouteMapping.routes;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService,
    private readonly articleAssignmentService: ArticleAssignmentService
  ) {}

  ngOnInit() {
    this.pageBlockId = +this.route.snapshot.paramMap.get('id')!;
    this.sectionLabel = this.route.snapshot.queryParamMap.get('placeInHomepage') ?? '';
    this.initialize();
  }

  async initialize() {
    const assignments = await this.articleAssignmentService.getAllAsync();
    const current = assignments.find(a => a.pageBlockId === this.pageBlockId);

    if (current) {
      this.selectedArticleId = current.articleId;
      this.showButton = current.showButton;
      this.buttonTargetRoute = current.buttonTargetRoute ?? null;
      this.currentAssignmentId = current.id;
    }

    const articles = await this.articleService.getAllAsync();
    this.articles = articles.map(a => ({ id: a.id, title: a.title }));
  }

  async saveArticleAssignment() {
    if (this.selectedArticleId === null) return;

    const dto: CreateArticleAssignmentDto = {
      id: this.currentAssignmentId ?? undefined,
      pageBlockId: this.pageBlockId,
      articleId: this.selectedArticleId,
      showButton: this.showButton,
      buttonTargetRoute: this.showButton ? this.buttonTargetRoute ?? '' : '',
    };

    if (this.currentAssignmentId !== null) {
      await this.articleAssignmentService.updateAsync(this.currentAssignmentId, dto);
    } else {
      await this.articleAssignmentService.createAsync(dto);
    }

    this.router.navigate(['/dashboard/moderator/assignments']);
  }
}
