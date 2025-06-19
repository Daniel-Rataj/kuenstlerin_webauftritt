import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  standalone: true
})
export class PaginationComponent {
  @Input() currentPage: number = 0;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  get hasPrevious(): boolean {
    return this.currentPage > 0;
  }

  get hasNext(): boolean {
    return (this.currentPage + 1) * this.pageSize < this.totalItems;
  }

  prev() {
    if (this.hasPrevious) this.pageChange.emit(this.currentPage - 1);
  }

  next() {
    if (this.hasNext) this.pageChange.emit(this.currentPage + 1);
  }
}
