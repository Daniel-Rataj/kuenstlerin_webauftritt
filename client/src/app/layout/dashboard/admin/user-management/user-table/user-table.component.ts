import { Component, OnInit } from '@angular/core';
import { User } from '../../../../../models/user';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRole } from '../../../../../models/enums/user.role';
import { CommonModule } from '@angular/common';
import { AddUserDialogComponent } from '../../add-user-dialog/add-user-dialog.component';
import { UserService } from '../../../../../services/user/user.service';
import { UserDto } from '../../../../../models/dto/user.dto';

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  imports: [CommonModule, AddUserDialogComponent, UserTableComponent]
})
export class UserTableComponent implements OnInit {
  readonly Math = Math;
  showAddUserModal = false;
  users: User[] = [];
  pagedUsers: User[] = [];
  pageSize = 5;
  currentPage = 1;
  currentUser!: User;

  constructor(
    private readonly userService: UserService<User, UserDto>,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    this.loadUsers();
  }

  async loadUsers() {
    this.users = await this.userService.getAllAsync();
    this.setPage(1);
  }

  setPage(page: number) {
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.pagedUsers = this.users.slice(start, end);
  }

  canDelete(user: User): boolean {
    const isNotSelf = user.id !== this.currentUser.id;
    const isAdmin = user.role === UserRole.Admin;
    const otherAdmins = this.users.filter(u => u.role === UserRole.Admin && u.id !== user.id);
    return isAdmin && isNotSelf && otherAdmins.length > 0;
  }

  async deleteUser(user: User) {
    if (!confirm(`Benutzer "${user.username}" wirklich löschen?`)) return;

    await this.userService.deleteAsync(user.id);
    await this.loadUsers();
  }

  async addUser(newUser: UserDto) {
    try {
      const created = await this.userService.createAsync(newUser);
      this.users.push(created);
      this.setPage(this.currentPage);
      alert(`Benutzer "${created.username}" wurde erfolgreich erstellt.`);
    } catch (error) {
      alert('Fehler beim Erstellen des Benutzers.');
      throw error;
    }
  }
}
