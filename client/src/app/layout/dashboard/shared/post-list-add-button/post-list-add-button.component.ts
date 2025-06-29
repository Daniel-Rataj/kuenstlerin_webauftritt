import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list-add-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-list-add-button.component.html'
})
export class PostListAddButtonComponent {
  @Input() label: string = 'Hinzufügen';
  @Input() action!: () => void | Promise<void>;

  onClick(): void {
    this.action();
  }
}
