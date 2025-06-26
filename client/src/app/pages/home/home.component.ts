import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';
import { ExhibitionGridComponent } from '../../shared/exhibition-grid/exhibition-grid.component';
import { ExhibitionElementsModalComponent } from '../../shared/exhibition-elements-modal/exhibition-elements-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExhibitionGridComponent,
    ExhibitionElementsModalComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  exhibitions: ExhibitionDto[] = [];

  favoriteArt = {
    img: 'images/favoriteArt.jpg',
    title: 'Mein Lieblingsbild'
  };

  selectedElement: ExhibitionElement | null = null;

  constructor(private exhibitionService: ExhibitionService) {}

  ngOnInit(): void {
    this.loadExhibitions();
  }

  async loadExhibitions(): Promise<void> {
    try {
      const data = await this.exhibitionService.getAllPublishedAsync();
      // Filtere Ausstellungen ohne ID und sortiere dann absteigend nach ID (neueste zuerst)
      this.exhibitions = data
        .filter(e => e.id !== undefined && e.id !== null)
        .sort((a, b) => b.id! - a.id!);
    } catch (error) {
      console.error('Fehler beim Laden der Ausstellungen', error);
    }
  }

  openModal(element: ExhibitionElement): void {
    this.selectedElement = element;
  }

  closeModal(): void {
    this.selectedElement = null;
  }

  openFavoriteArtModal(): void {
    this.openModal({
      id: -1,
      name: this.favoriteArt.title,
      imageUrl: this.favoriteArt.img,
      description: 'Dieses Werk liegt mir besonders am Herzen.',
      availableToBuy: false,
      width: 0,
      length: 0
    });
  }
}
