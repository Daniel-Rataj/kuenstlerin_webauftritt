import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';  // RouterModule für Routing
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,  // Hier RouterModule importieren
    HeaderComponent,
    NavigationComponent,
    HomeComponent,
    FooterComponent,
    GalleryComponent, 
    AboutmeComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Altrock Art';

  images = [
    '/images/Hero1.jpg',
    '/images/Hero2.jpg',
    '/images/Hero3.jpg'
  ];
  currentImageIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);
    }
  }
}