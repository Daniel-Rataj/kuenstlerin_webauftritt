import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { CreateArticleDto } from '../../models/dto/create-article.dto';
import { Article } from '../../models/article';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseService<Article, CreateArticleDto>{

  constructor(http: HttpClient) {
      super(http, 'article');
    }
}
