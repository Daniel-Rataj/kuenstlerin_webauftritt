import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExhibitionElement } from '../../models/dto/exhibition-element.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exhibition-elements-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exhibition-elements-modal.component.html',
  styleUrl: './exhibition-elements-modal.component.scss'
})
export class ExhibitionElementsModalComponent {
  @Input() element: ExhibitionElement | null = null;
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/fallback.jpg';
  }
}
