import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // ⬅️ Hier importieren

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule], // ⬅️ RouterModule hinzufügen
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {}
