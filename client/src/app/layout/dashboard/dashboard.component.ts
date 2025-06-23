import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { UserRole } from '../../models/enums/user-role';
import { AuthService } from '../../services/auth/auth.service';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  // Expose the UserRole enum to the template
  UserRole = UserRole;

  // Define all available dashboard cards with their metadata and access roles
  private readonly allCards = [
    {
      title: 'Gallerie Posts',
      description:
        'Durchsuchen, bearbeiten und erstellen neuer Inhalte für die Gallerie',
      icon: 'fas fa-images',
      route: '/dashboard/moderator/gallery',
      roles: [UserRole.Moderator],
    },
    {
      title: 'Homepage Posts',
      description:
        'Durchsuchen, bearbeiten und erstellen neuer Inhalte für den Abschnitt "Aktuelles" der Homepage',
      icon: 'fas fa-images',
      route: '/dashboard/moderator/latest',
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

  // Access the current user's name from localStorage (fallback if signal not used)
  get userName(): string {
    const user = JSON.parse(this.browserStorageService.getItem('user') ?? '{}');
    return user.username ?? 'Guest';
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
