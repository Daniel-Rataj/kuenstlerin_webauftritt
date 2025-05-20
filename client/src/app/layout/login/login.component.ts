import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { LoginRequest } from '../../models/requests/login.request';
import { UserRole } from '../../models/enums/user.role';

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
        // Get the numeric role from response
        const userRole: UserRole = res.user.role;
        
        // Route based on role
        switch (userRole) {
          case UserRole.Admin:
            this.router.navigate(['/dashboard/home']);
            break;
          case UserRole.Moderator:
            this.router.navigate(['/dashboard/home']);
            break;
          default:
            // Fallback for unexpected roles
            this.router.navigate(['/dashboard']);
            console.warn(`Unknown role: ${userRole}`);
        }
    },
    error: () => {
      this.errorMessage.set('Invalid username or password');
    }
    });
  }
}