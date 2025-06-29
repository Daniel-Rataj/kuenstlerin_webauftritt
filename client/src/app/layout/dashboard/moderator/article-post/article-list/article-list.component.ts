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
import { ArticleAssignmentService } from '../../../../../services/articleAssignment/article-assignment.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent, PostListComponent],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss'
})
export class ArticleListComponent implements PostListHost<Article>, OnInit {
  private readonly articles = signal<Article[]>([]);
  private readonly assignments = signal<{ articleId: number }[]>([]);
  selectedArticle?: Article;
  showConfirmDelete = false;


  constructor(private readonly router: Router,
    private readonly articleService: ArticleService,
    private readonly articleAssignmentService: ArticleAssignmentService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  async loadArticles(): Promise<void> {
    try {
      const [articles, assignments] = await Promise.all([
        this.articleService.getAllAsync(),
        this.articleAssignmentService.getAllAsync()
      ]);
      this.articles.set(articles);
      this.assignments.set(assignments);
    } catch (error) {
      console.error("Fehler beim Laden", error);
    } finally {
      console.log("TODO: Toastservice");
    }
  }

  getArticles(): Article[] {
    return this.articles();
  }

  isArticleAssigned(article: Article): boolean {
    return this.assignments().some(a => a.articleId === article.id);
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
      
      try {
        await this.articleService.deleteAsync(this.selectedArticle.id);
        this.articles.set(
          this.articles().filter(e => e.id !== this.selectedArticle!.id)
        );
      } catch(error) {
        console.error("Fehler beim Löschen des Artikels", error)
      } finally {
        console.log("TODO: Toastservice")
        this.closeConfirmDeleteModal();
      }
    }
    //#endregion
  
  getTitle = (article: Article) => article.title;

  getSubtitle = (article: Article) => "";

  getBadge = (article: Article): string => {
    return this.isArticleAssigned(article) ? "Assigned" : "Not Assigned"
  }

  getBadgeClass = (article: Article): string => {
    return this.isArticleAssigned(article) ? "bg-success" : "bg-info";
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

  navigateToEdit(articleId: number): void | Promise<void> {
    this.router.navigate([`/dashboard/moderator/article/${articleId}/edit`]);
  }

  getAddButton(): PostListAddConfig {
    return {
      label: 'Neuen Artikel erstellen',
      action: () => this.navigateToCreate()
    };
  }
}
