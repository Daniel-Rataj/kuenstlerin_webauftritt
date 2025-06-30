import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHeaderComponent } from '../../shared/dashboard-header/dashboard-header.component';
import { DashboardToolbarComponent } from '../../shared/dashboard-toolbar/dashboard-toolbar.component';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [RouterModule, DashboardHeaderComponent, DashboardToolbarComponent],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss'
})
export class InsightsComponent {

}
