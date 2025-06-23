import { Component, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router} from '@angular/router';
import { LoginRequestDto } from '../../models/dto/login-request.dto';
import { UserRole } from '../../models/enums/user-role';
import { BrowserStorageService } from '../../services/browser-storage/browser-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  // Signal für die Login-Daten
  private readonly credentials = signal<LoginRequestDto>({
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

  constructor(private readonly authService: AuthService, private readonly browserStorageService: BrowserStorageService, private readonly router: Router) {}

  async login(): Promise<void> {
    try {
      const response = await this.authService.loginAsync(this.credentials());

      // Speichern der Token-Daten wurde bereits im AuthService erledigt

      const userRole: UserRole = response.user.role;

      switch (userRole) {
        case UserRole.Admin:
        case UserRole.Moderator:
          await this.router.navigate(['/dashboard/home']);
          break;
        default:
          await this.router.navigate(['/dashboard']);
          console.warn(`Unknown role: ${userRole}`);
          break;
      }
    } catch (error) {
      this.errorMessage.set('Fehler beim Login');
      console.error(this.errorMessage)
      throw error;
    }
  }
}