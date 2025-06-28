import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { ArticleListComponent } from './article-list/article-list.component';

@Component({
  selector: 'app-article-post',
  standalone: true,
  imports: [CommonModule, RouterModule, DashboardHeaderComponent, DashboardToolbarComponent, ArticleListComponent],
  templateUrl: './article-post.component.html',
  styleUrl: './article-post.component.scss'
})
export class ArticlePostComponent {

  
}
