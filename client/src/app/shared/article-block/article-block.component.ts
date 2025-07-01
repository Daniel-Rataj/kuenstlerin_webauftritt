import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/article';
import { ArticleService } from '../../services/article/article.service';
import { ArticleAssignmentService } from '../../services/articleAssignment/article-assignment.service';
import { PageRouteMapping } from '../../models/mapping/page-route-mapping';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-article-block',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './article-block.component.html',
  styleUrl: './article-block.component.scss'
})
export class ArticleBlockComponent implements OnInit {
  @Input() pageBlockId?: number;
  @Input() articleId?: number;


  article: Article | null = null;
  showButton = false;
  buttonTargetRoute: string | null = null;
  buttonLabel: string | null = null;

  constructor(
    private readonly assignmentService: ArticleAssignmentService,
    private readonly articleService: ArticleService
  ) {}

  ngOnInit() {
    this.initialize();
  }
   
    async initialize() {
    if (this.pageBlockId != null) {
      const assignments = await this.assignmentService.getAllAsync();
      const assignment = assignments.find(a => a.pageBlockId === this.pageBlockId);
      if (!assignment) return;

      this.showButton = assignment.showButton;
      this.buttonTargetRoute = assignment.buttonTargetRoute || null;
      this.buttonLabel = this.buttonTargetRoute
        ? PageRouteMapping.getLabel(this.buttonTargetRoute)
        : null;

      this.article = await this.articleService.getByIdAsync(assignment.articleId);

    } else if (this.articleId != null) {
      this.article = await this.articleService.getByIdAsync(this.articleId);
      this.showButton = false;
      this.buttonTargetRoute = null;
      this.buttonLabel = null;

    } else {
      console.warn(
        'ArticleBlockComponent: Neither pageBlockId nor articleId was provided. Component will not render anything.'
      );
    }
  }
}
