import { Component, OnInit, signal } from '@angular/core';
import { PostListHost } from '../../../shared/configs/post-list';
import { PostListAddConfig } from '../../../shared/configs/post-list-add-button';
import { ArticleService } from '../../../../../services/article/article.service';
import { Router } from '@angular/router';
import { Article } from '../../../../../models/article';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { PostListComponent } from '../../../shared/post-list/post-list.component';
import { PostListAction } from '../../../shared/configs/post-list-action';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, PostListComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements PostListHost<Article>, OnInit {
  private readonly articles = signal<Article[]>([]);
  selectedArticle?: Article;
  showConfirmDelete = false;


  constructor(private readonly router: Router, private readonly articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  async loadArticles(): Promise<void> {
    //const data = await this.articleService.getAllAsync();
    // this.articles.set(data);
  }

  getArticles(): Article[] {
    return this.articles();
  }

  public navigateToCreate(): void {
    this.router.navigate(['/dashboard/moderator/article/create']);
  }

  //#region confirm-dialog
    openConfirmDeleteModal(article: Article): void {
      this.selectedArticle = article;
      this.showConfirmDelete = true;
    }
  
    closeConfirmDeleteModal(): void {
      this.selectedArticle = undefined;
      this.showConfirmDelete = false;
    }
  
    async confirmDelete(): Promise<void> {
      if (!this.selectedArticle) return;
  
      await this.articleService.deleteAsync(this.selectedArticle.id);
      this.articles.set(
        this.articles().filter(e => e.id !== this.selectedArticle!.id)
      );
      this.closeConfirmDeleteModal();
    }
    //#endregion
  
  getTitle = (article: Article) => article.title;

  getSubtitle = (article: Article) => "";

  getBadge(item: Article): string {
    // Ist Article einem PageBlock zugewiesen, dann zeige Assigned an ansonsten nichts

    throw new Error('Method not implemented.');
  }

  getBadgeClass(item: Article): string {
    // Ist Article einem PageBlock zugewiesen, dann soll bg-info als Class verwendet werden
    throw new Error('Method not implemented.');
  }

  getElementCount = (article: Article) => 1;

  getActions(): PostListAction<Article>[] {
    const editAction: PostListAction<Article> = {
        label: 'Bearbeiten',
        iconClass: 'fa-solid fa-pen-to-square',
        action: (article) => this.navigateToEdit(article.id)
    };

    const deleteAction: PostListAction<Article> = {
      label: 'Löschen',
      iconClass: 'fa-solid fa-trash',
      isDanger: true,
      action: (article) => this.openConfirmDeleteModal(article)
    }
    return [editAction, deleteAction]
  }

  navigateToEdit(arg0: number): void | Promise<void> {
    throw new Error('Method not implemented.');
  }

  getAddButton(): PostListAddConfig {
    return {
      label: 'Neuen Artikel erstellen',
      action: () => this.navigateToCreate()
    };
  }
}
