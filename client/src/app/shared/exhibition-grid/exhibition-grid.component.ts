import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';

@Component({
  selector: 'app-exhibition-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exhibition-grid.component.html',
  styleUrls: ['./exhibition-grid.component.scss']
})
export class ExhibitionGridComponent {
  @Input() exhibition!: ExhibitionDto;
  @Output() elementClicked = new EventEmitter<ExhibitionElement>();

  get getFormattedDate(): string | undefined {
    let formattedDate;
    if(this.exhibition?.date){
      formattedDate =  this.exhibition.date?.toLocaleDateString('de-DE');
    }
    return formattedDate;
  }

  isOpen = true;

  toggleOpen(): void {
    this.isOpen = !this.isOpen;
  }

  onElementClick(element: ExhibitionElement): void {
    this.elementClicked.emit(element);
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = 'assets/fallback.jpg';
  }
}
