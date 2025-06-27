import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list-action-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list-action-item.component.html'
})
export class PostListActionItemComponent {
  @Input() label!: string;
  @Input() iconClass!: string;
  @Input() isDanger = false;
  @Input() action!: () => void;

  onClick(): void {
    this.action();
  }
}
