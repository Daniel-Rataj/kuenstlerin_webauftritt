import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { Router } from '@angular/router';
import { ArticleBlockComponent } from '../../shared/article-block/article-block.component';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';
import { ArticleAssignment } from '../../models/article-assignment';
import { ArticleAssignmentService } from '../../services/articleAssignment/article-assignment.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ArticleBlockComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];

  constructor(private readonly router: Router, 
    private readonly articleService: ArticleService, 
    private readonly articleAssignmentService: ArticleAssignmentService) {}

  ngOnInit(): void {
      this.initialize();
  }
  
  async initialize() {
    const dataArticles = await this.articleService.getAllAsync();
    const dataAssignment = await this.articleAssignmentService.getAllAsync();

    if(dataArticles.length > 0) {
    // extract id´s of the assigned articles
      const assignedArticleIds = new Set(
        dataAssignment.map(a => a.articleId)
      );

      // sort out pageBlockId articles
      this.articles = dataArticles.filter(article => 
        !assignedArticleIds.has(article.id)
      );
    }
  }
}
