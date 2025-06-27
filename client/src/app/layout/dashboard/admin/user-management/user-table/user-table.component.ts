import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../../models/user';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRole } from '../../../../../models/enums/user-role';
import { AddUserDialogComponent } from '../../add-user-dialog/add-user-dialog.component';
import { UserService } from '../../../../../services/user/user.service';
import { UserDto } from '../../../../../models/dto/user.dto';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-table',
  standalone: true,
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  imports: [CommonModule, AddUserDialogComponent, ConfirmDialogComponent]
})
export class UserTableComponent implements OnInit {
  readonly Math = Math;
  showAddUserModal = false;
  showConfirmDialog = false;

  users: User[] = [];
  pagedUsers: User[] = [];
  pageSize = 5;
  currentPage = 1;
  currentUser!: User;
  selectedUserToDelete?: User;

  constructor(
    private readonly userService: UserService<User, UserDto>,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getUser();
    console.log('Aktuell eingeloggter Benutzer:', this.currentUser);
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
    // Nur Admins dürfen löschen
    if (this.currentUser.role !== UserRole.Admin) return false;

    // Man kann sich selbst nicht löschen
    if (user.id === this.currentUser.id) return false;

    // Wenn der zu löschende User Admin ist:
    // Es muss mindestens noch ein anderer Admin außer diesem User geben, sonst darf nicht gelöscht werden
    if (user.role === UserRole.Admin) {
      const otherAdmins = this.users.filter(u => u.role === UserRole.Admin && u.id !== user.id);
      return otherAdmins.length > 0;
    }

    // Für alle anderen Rollen (Moderator, Editor, Initialized) kann der Admin löschen
    return true;
  }

  deleteUser(user: User) {
    this.selectedUserToDelete = user;
    this.showConfirmDialog = true;
  }

  async confirmDeleteUser() {
    if (!this.selectedUserToDelete) return;

    try {
      await this.userService.delete(this.selectedUserToDelete.id);
      await this.loadUsers();
      // alert entfernt, keine Meldung mehr
    } catch (err) {
      alert('Fehler beim Löschen des Benutzers.');
      console.error(err);
    } finally {
      this.showConfirmDialog = false;
      this.selectedUserToDelete = undefined;
    }
  }

  cancelDeleteUser() {
    this.showConfirmDialog = false;
    this.selectedUserToDelete = undefined;
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
