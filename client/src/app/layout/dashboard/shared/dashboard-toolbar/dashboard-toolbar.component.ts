import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-dashboard-toolbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-toolbar.component.html',
  styleUrls: ['./dashboard-toolbar.component.scss']
})
export class DashboardToolbarComponent {
  @Input() breadcrumbs: string[] = [];

  constructor(private readonly location: Location, private readonly router: Router) {}

  get isOnDashboardRoot(): boolean {
    return this.router.url === '/dashboard' || this.router.url === '/dashboard/home';
  }

  goBack(): void {
    this.location.back();
  }
}
