import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-item.component.html',
  styleUrl: './nav-item.component.scss'
})
export class NavItemComponent {
  @Input() icon!: string; // FontAwesome-Icon-Klasse (z. B. "fa-home")
  @Input() label!: string; // Anzeigetext (z. B. "Dashboard")
  @Input() routerLink!: string; // Route (z. B. "/dashboard")
  @Input() collapsed = false; // Steuert, ob der Text angezeigt wird
  @Input() isExact = false; // Für exakte Route-Matching (z. B. Startseite)
}
