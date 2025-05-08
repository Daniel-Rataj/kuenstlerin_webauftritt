import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ /* andere Module, die du benötigst, z.B. CommonModule, FormsModule etc. */],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  // Deine Logik hier
}
