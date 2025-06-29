import { Component, OnInit } from '@angular/core';
import { CreateArticleDto } from '../../../../../models/dto/create-article.dto';
import { ArticleService } from '../../../../../services/article/article.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardHeaderComponent } from '../../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardHeaderComponent, DashboardToolbarComponent, ConfirmDialogComponent],
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.scss'
})
export class ArticleFormComponent implements OnInit {
  articleId?: number;
  article: CreateArticleDto = { title: '', content: '' };
  showConfirmDialog = false;

  constructor(private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService) {}

  ngOnInit(): void {
    this.initialize();
  }

  async initialize() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.articleId = +idParam;
      const existing = await this.articleService.getByIdAsync(this.articleId);
      this.article = { title: existing.title, content: existing.content };
    }
  }

  onSubmit() {
    this.showConfirmDialog = true;
  }

  async confirmCreate() {
    this.showConfirmDialog = false;
    if (this.articleId) {
      await this.articleService.updateAsync(this.articleId, this.article);
    } else {
      await this.articleService.createAsync(this.article);
    }
    this.router.navigate(['dashboard/moderator/article']); // oder wohin du willst
  }

  cancelCreate() {
    this.showConfirmDialog = false;
  }
}
