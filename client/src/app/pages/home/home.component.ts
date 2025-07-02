import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExhibitionService } from '../../services/exhibition/exhibition.service';
import { ExhibitionDto, ExhibitionElement } from '../../models/dto/exhibition.dto';
import { ExhibitionGridComponent } from '../../shared/exhibition-grid/exhibition-grid.component';
import { ExhibitionElementsModalComponent } from '../../shared/exhibition-elements-modal/exhibition-elements-modal.component';
import { ArticleBlockComponent } from '../../shared/article-block/article-block.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ExhibitionGridComponent,
    ExhibitionElementsModalComponent,
    ArticleBlockComponent
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
      // Filtere Ausstellungen ohne ID und sortiere absteigend nach ID (neueste zuerst)
      this.exhibitions = data
        .filter(e => e.id !== undefined && e.id !== null)
        .sort((a, b) => b.id! - a.id!);
    } catch (error) {
      console.error('Fehler beim Laden der Ausstellungen', error);
    }
  }

  // NEU: Berechnung der anzuzeigenden Bilder nach deiner Logik
  getPortfolioPreviewImages(): ExhibitionElement[] {
    if (!this.exhibitions || this.exhibitions.length === 0) {
      return [];
    }

    // Nimm die 3 neuesten Ausstellungen mit mindestens 1 Bild
    const latestExhibitions = this.exhibitions
      .filter(e => e.exhibitionElements && e.exhibitionElements.length > 0)
      .slice(0, 3);

    if (latestExhibitions.length === 1) {
      // 1 Gallery → erste 3 Bilder
      return latestExhibitions[0].exhibitionElements.slice(0, 3);
    }

    if (latestExhibitions.length === 2) {
      // 2 Galeries → 2 Bilder aus der ersten, 1 aus der zweiten
      return [
        ...latestExhibitions[0].exhibitionElements.slice(0, 2),
        ...latestExhibitions[1].exhibitionElements.slice(0, 1)
      ];
    }

    if (latestExhibitions.length >= 3) {
      // 3 oder mehr Galeries → je 1 Bild aus den 3 neuesten
      return latestExhibitions.map(gallery => gallery.exhibitionElements[0]);
    }

    return [];
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
