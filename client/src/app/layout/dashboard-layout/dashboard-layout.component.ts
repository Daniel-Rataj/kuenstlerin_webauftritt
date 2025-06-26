import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarNavigationComponent } from '../sidebar-nav/sidebar-nav.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [RouterModule, SidebarNavigationComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  // Zustand der Sidebar (true = eingeklappt)
  isSidebarCollapsed = false;

  // Methode zum Toggle der Sidebar
  onSidebarToggle() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
