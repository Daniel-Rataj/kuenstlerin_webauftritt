import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../services/user/user.service';
import { User } from '../../../../models/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss',
  providers: [UserService]
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'actions'];
  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      this.dataSource.data = users;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteUser(user: User) {
    if (confirm(`Benutzer "${user.username}" wirklich löschen?`)) {
      this.userService.delete(user.id).subscribe(() => {
        // Benutzer aus Liste entfernen
        this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id);
        this.paginator.firstPage(); // auf Seite 1 springen falls nötig
      });
    }
  }

  addUser() {
    alert('Hinzufügen-Funktion noch nicht implementiert.');
  }
}
