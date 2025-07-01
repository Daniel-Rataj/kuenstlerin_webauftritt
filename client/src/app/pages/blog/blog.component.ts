import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article/article.service';
import { Router } from '@angular/router';
import { ArticleBlockComponent } from '../../shared/article-block/article-block.component';
import { Article } from '../../models/article';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, ArticleBlockComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit {
  articles: Article[] = [];

  constructor(private readonly router: Router, private readonly articleService: ArticleService) {}

  ngOnInit(): void {
      this.initialize();
  }
  
  async initialize() {
    const data = await this.articleService.getAllAsync();
    if(data.length > 0) {
      this.articles = data;
    }
  }
}
