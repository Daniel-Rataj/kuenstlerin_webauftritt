import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavigationComponent,
    FooterComponent
  ],
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements OnInit {
  isNavCollapsed = false;
  showCookieBanner = false;

  heroText: string = 'Willkommen bei der Künstlerin!';
  images = ['/images/Hero2.jpg', '/images/Hero3.jpg'];
  currentImageIndex = 0;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly router: Router,
    private readonly browserStorageService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
      }, 5000);

      const consent = this.browserStorageService.getItem('cookie-consent');
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

  toggleNav() {
    this.isNavCollapsed = !this.isNavCollapsed;
  }

  acceptCookies(): void {
    this.browserStorageService.setItem('cookie-consent', 'true');
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
      this.heroText = 'Art – Kunst mit Herz.';
    }
  }
}
