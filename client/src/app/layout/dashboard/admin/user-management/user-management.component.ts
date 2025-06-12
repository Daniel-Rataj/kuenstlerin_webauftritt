import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, UserTableComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
}
