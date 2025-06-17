import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  artWorks = [
    { img: 'images/kunst1.jpg', title: 'Magische Farben' },
    { img: 'images/kunst2.jpg', title: 'Lebendige Formen' },
    { img: 'images/kunst3.jpg', title: 'Emotionen in Rot' }
  ];

  favoriteArt = {
    img: 'images/favoriteArt.jpg',
    title: 'Mein Lieblingsbild'
  };

  selectedImage: string | null = null;

  openImage(imgSrc: string): void {
    this.selectedImage = imgSrc;
  }

  closeImage(event?: MouseEvent): void {
    if (event) event.stopPropagation();
    this.selectedImage = null;
  }
}
