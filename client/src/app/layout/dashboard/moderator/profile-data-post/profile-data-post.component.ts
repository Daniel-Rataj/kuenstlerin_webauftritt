import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'app-profile-data-post',
  standalone: true,
  imports: [CommonModule, DashboardHeaderComponent, DashboardToolbarComponent],
  templateUrl: './profile-data-post.component.html',
  styleUrl: './profile-data-post.component.scss'
})
export class ProfileDataPostComponent {

}
