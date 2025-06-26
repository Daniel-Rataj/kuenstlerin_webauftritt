import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../../../../services/browser-storage/browser-storage.service';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss',
})
export class DashboardHeaderComponent {
  @Input() title: string = '';

  // Access the current user's name from localStorage (fallback if signal not used)
  get userName(): string {
    const user = JSON.parse(this.browserStorageService.getItem('user') ?? '{}');
    return user.username ?? 'Guest';
  }

  get defaultTitle(): string {
    return 'Willkommen ' + this.userName + '!';
  }

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly browserStorageService: BrowserStorageService
  ) {}

  ngOnInit() {
    if(this.title.length === 0){
      this.title = this.defaultTitle;
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
