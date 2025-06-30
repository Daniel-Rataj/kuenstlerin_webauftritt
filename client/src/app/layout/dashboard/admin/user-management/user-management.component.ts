import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule, UserTableComponent, DashboardHeaderComponent, DashboardToolbarComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
}
