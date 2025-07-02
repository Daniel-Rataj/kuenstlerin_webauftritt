import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserRole } from '../../models/enums/user-role';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavItemComponent],
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavigationComponent implements OnInit {
  @Input() isCollapsed = false;
  @Output() toggleNav = new EventEmitter<void>();

  navItems: any = [];

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    const currentUserRole = this.authService.getUserRole();
    this.setNavItems(currentUserRole);
  }

  private setNavItems(role: UserRole) {
    this.navItems = [
      { routerLink: '/dashboard/home', label: 'Dashboard', icon: 'fa-gauge', isExact: true },
    ];

    if (role === UserRole.Admin) {
      this.navItems.push(
        { routerLink: '/dashboard/admin/users', label: 'Benutzerverwaltung', icon: 'fa-users' },
        { routerLink: '/dashboard/admin/insights', label: 'Statistiken', icon: 'fa-chart-line' }
      );
    }

    if (role === UserRole.Moderator) {
      this.navItems.push(
        { routerLink: '/dashboard/moderator/gallery', label: 'Ausstellungen', icon: 'fa-images' },
        { routerLink: '/dashboard/moderator/assignments', label: 'Beiträge', icon: 'fa-tasks' },
        { routerLink: '/dashboard/moderator/article', label: 'Artikel', icon: 'fa-newspaper' }
      );
    }

    // Optionally always include public routes like contact
    this.navItems.push(
      { routerLink: '/gallery', label: 'Galerie', icon: 'fa-panorama' },
    );
  }

  onToggleClick() {
    this.toggleNav.emit();
  }
}