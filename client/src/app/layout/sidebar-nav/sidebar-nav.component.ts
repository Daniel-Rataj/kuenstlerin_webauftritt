import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, NavItemComponent],
  templateUrl: './sidebar-nav.component.html',
})
export class SidebarNavigationComponent {
  @Input() isCollapsed = false;
  @Output() toggleNav = new EventEmitter<void>();

  navItems = [
    { routerLink: '/', label: 'Startseite', icon: 'fa-home', isExact: true },
    { routerLink: '/gallery', label: 'Galerie', icon: 'fa-images' },
    { routerLink: '/aboutme', label: 'Über mich', icon: 'fa-user' },
    { routerLink: '/contact', label: 'Kontakt', icon: 'fa-envelope' },
    { routerLink: '/login', label: 'Login', icon: 'fa-sign-in-alt' },
  ];

  onToggleClick() {
    this.toggleNav.emit();
  }
}