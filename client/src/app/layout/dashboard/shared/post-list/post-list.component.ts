import { Component, Input, signal, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostListActionItemComponent } from '../post-list-action-item/post-list-action-item.component';
import { PaginationComponent } from '../../../../shared/pagination/pagination.component';
import { PostListAction } from '../configs/post-list-action';
import { PostListAddConfig } from '../configs/post-list-add-button';
import { PostListAddButtonComponent } from '../post-list-add-button/post-list-add-button.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PostListActionItemComponent,
    PostListAddButtonComponent,
    PaginationComponent,
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent<T> {
  items = input.required<T[]>();
  @Input() getTitle!: (item: T) => string;
  @Input() getSubtitle!: (item: T) => string;
  @Input() getBadge!: (item: T) => string;
  @Input() getBadgeClass!: (item: T) => string;
  @Input() getElementCount!: (item: T) => number;
  @Input() actions: PostListAction<T>[] = [];
  @Input() addButton?: PostListAddConfig;

  @Input() pageSize = 5;
  page = signal(0);

  pagedItems = computed(() => {
    const start = this.page() * this.pageSize;
    return this.items().slice(start, start + this.pageSize);
  });

  getWrappedAction = (a: PostListAction<T>, item: T): (() => void) => {
    return () => a.action?.(item);
  };
}
