import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserRole } from '../../models/enums/user-role';
import { AuthService } from '../../services/auth/auth.service';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';
import { DashboardToolbarComponent } from './shared/dashboard-toolbar/dashboard-toolbar.component';
import { DashboardHeaderComponent } from './shared/dashboard-header/dashboard-header.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardHeaderComponent, DashboardToolbarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss' 
})
export class DashboardComponent {
  // Expose the UserRole enum to the template
  UserRole = UserRole;

  // Define all available dashboard cards with their metadata and access roles
  private readonly allCards = [
    {
      title: 'Ausstellungen',
      description: 'Durchsuchen, bearbeiten und erstellen neuer Inhalte für die Galerie',
      icon: 'fas fa-images',
      route: '/dashboard/moderator/gallery',
      roles: [UserRole.Moderator],
    },
    {
      title: 'Inhalte der Startseite zuweisen',
      description: 'Zuweisen von Artikeln und Bildern für die Abschnitte der Startseite',
      icon: 'fas fa-house-circle-check',
      route: '/dashboard/moderator/assignments',
      roles: [UserRole.Moderator],
    },
    {
      title: 'Artikel erstellen',
      description:
        'Durchsuchen, bearbeiten und erstellen neuer Artikel für die Startseite und Blog',
      icon: 'fas fa-newspaper',
      route: '/dashboard/moderator/article',
      roles: [UserRole.Moderator],
    },
    {
      title: 'Persönliche Daten pflegen',
      description:
        'Pflege von persönlichen Daten wie Telefonnummer, Adresse und Portaitbild',
      icon: 'fas fa-circle-user',
      route: '/dashboard/moderator/profile',
      roles: [UserRole.Moderator],
    },
    {
      title: 'Benutzerverwaltung',
      description: 'Moderatoren zuweisen und verwalten',
      icon: 'fas fa-users-cog',
      route: '/dashboard/admin/users',
      roles: [UserRole.Admin],
    },
    {
      title: 'Statistiken',
      description: 'Anzeigen von Analyse- und Nutzungsstatistiken',
      icon: 'fas fa-chart-line',
      route: '/dashboard/admin/insights',
      roles: [UserRole.Admin],
    },
  ];

  // Dynamically filter cards based on the logged-in user's role
  get dashboardCards() {
    const role = this.userRole;
    let availableCards: any[] = [];
    
    if(role !== null && role !== undefined) { // Checks if role is not Null or undefined

      this.allCards.forEach(card => {
        if(card.roles.includes(role)) {
          availableCards.push(card)
        }
      });
    }

    //  ? this.allCards.filter((card) => card.roles.includes(role))
      //: []; // Show no cards if no role (unauthenticated)
    return availableCards;
  }

  // Access the current user's role via the AuthService
  get userRole(): UserRole | null {
    return this.authService.getUserRole();
  }

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly browserStorageService: BrowserStorageService
  ) {}

  // Navigate to the selected route when a card is clicked
  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
