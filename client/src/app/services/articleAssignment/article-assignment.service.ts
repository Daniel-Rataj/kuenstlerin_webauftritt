import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { CreateArticleAssignmentDto } from '../../models/dto/create-article-assignment.dto';
import { ArticleAssignment } from '../../models/article-assignment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticleAssignmentService extends BaseService<ArticleAssignment, CreateArticleAssignmentDto> {

  constructor(http: HttpClient) {
    super(http, 'articleAssignment');
  }
}
