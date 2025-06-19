import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { filter } from 'rxjs';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    GalleryComponent,
    AboutmeComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Altrock Art';
  isNavCollapsed = false;

  heroText: string = 'Willkommen bei der Künstlerin!';
  images = [
    '/images/Hero2.jpg',
    '/images/Hero3.jpg'
  ];
  currentImageIndex = 0;

  showCookieBanner = false;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);

      // Cookie-Zustimmung prüfen (localStorage)
      const consent = localStorage.getItem('cookie-consent');
      this.showCookieBanner = consent !== 'true';
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        this.updateHeroText();
      });
  }

  ngAfterViewInit(): void {
    this.updateHeroText();
  }

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  acceptCookies(): void {
    localStorage.setItem('cookie-consent', 'true');
    this.showCookieBanner = false;
  }

  private updateHeroText() {
    const path = this.router.url;

    if (path === '/' || path === '' || path.includes('home')) {
      this.heroText = 'Willkommen bei der Künstlerin!';
    } else if (path.includes('gallery')) {
      this.heroText = 'Entdecke die Galerie!';
    } else if (path.includes('aboutme')) {
      this.heroText = 'Erfahre mehr über mich!';
    } else if (path.includes('contact')) {
      this.heroText = 'Kontaktieren Sie mich!';
    } else {
      this.heroText = ' Art – Kunst mit Herz.';
    }
  }
}
