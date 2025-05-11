import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { LoginRequest } from '../../models/requests/login.request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Signal für die Login-Daten
  private readonly credentials = signal<LoginRequest>({
    username: '',
    password: ''
  });

  // Getter & Setter für ngModel
  get username(): string {
    return this.credentials().username;
  }
  set username(value: string) {
    this.credentials.update(c => ({ ...c, username: value }));
  }

  get password(): string {
    return this.credentials().password;
  }
  set password(value: string) {
    this.credentials.update(c => ({ ...c, password: value }));
  }

  // Fehlertext als Signal
  errorMessage = signal<string | null>(null);

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  login(): void {
    this.authService.login(this.credentials()).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage.set('Invalid username or password');
      }
    });
  }
}