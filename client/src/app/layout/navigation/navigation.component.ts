import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  // Eingabe vom Parent: ob Sidebar eingeklappt ist
  @Input() isCollapsed = false;

  // EventEmitter für Toggle-Aktion
  @Output() toggleNav = new EventEmitter<void>();

  // Methode zum Auslösen des Events beim Klick
  onToggleClick() {
    this.toggleNav.emit();
  }
}
