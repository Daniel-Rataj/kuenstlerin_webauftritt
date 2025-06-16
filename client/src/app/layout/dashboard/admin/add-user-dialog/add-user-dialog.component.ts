import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRole } from '../../../../models/enums/user-role';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDto } from '../../../../models/dto/user.dto';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  imports: [FormsModule, CommonModule]
})
export class AddUserDialogComponent {
  @Input() existingUsers: User[] = [];
  
  @Output() userCreated = new EventEmitter<UserDto>();
  @Output() close = new EventEmitter<void>();

  // Make UserRole available for the template
  readonly UserRole = UserRole;

  username = '';
  password = '';
  role: UserRole = UserRole.Initialized;

  submit() {
    // initialize fields
    debugger;
    const newUser: UserDto = {
      username: this.username,
      password: this.password,
      role: Number(this.role)
    };

    if(newUser.role === UserRole.Moderator) {
      console.warn("Rolle ist Moderator")
    }
    this.userCreated.emit(newUser);
    this.close.emit();

    // reset fields
    this.resetNewUser();
  }

  resetNewUser() {
    this.username = '';
    this.password = '';
    this.role = UserRole.Initialized;
  }


  // Checks if the username input is empty (after trimming whitespace)
  isUsernameEmpty(): boolean {
    return this.username.trim() === '';
  }

  // Checks if the password is shorter than the minimum required length (6 characters)
  isPasswordTooShort(): boolean {
    return this.password.length < 6;
  }

  // Checks if the entered username already exists (case-insensitive)
  isUsernameTaken(): boolean {
    return this.existingUsers.some(u => u.username.toLowerCase() === this.username.trim().toLowerCase());
  }

  // Validates the form by ensuring username is not empty, password is long enough, and username is unique
  isValid(): boolean {
    return !(this.isUsernameEmpty() || this.isPasswordTooShort() || this.isUsernameTaken());
  }
}
