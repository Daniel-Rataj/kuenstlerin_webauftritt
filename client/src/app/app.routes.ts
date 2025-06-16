import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { authGuard } from './configs/authentication/auth.guard';
import { roleGuard } from './configs/authentication/role.guard';
import { UserManagementComponent } from './layout/dashboard/admin/user-management/user-management.component';
import { InsightsComponent } from './layout/dashboard/admin/insights/insights.component';
import { GalleryPostComponent } from './layout/dashboard/moderator/gallery-post/gallery-post.component';
import { UserRole } from './models/enums/user-role';
import { HomePostComponent } from './layout/dashboard/moderator/home-post/home-post.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'aboutme', component: AboutmeComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        children: [
            // Shared Routes
            { path: 'home', component: DashboardComponent },

            // Admin-Routes
            {
                path: 'admin',
                canActivate: [roleGuard([UserRole.Admin])],
                children: [
                    { path: 'users', component: UserManagementComponent },
                    { path: 'insights', component: InsightsComponent }
                ]
            },

            // Moderator-Routes
            {
                path: 'moderator',
                canActivate: [roleGuard([UserRole.Moderator])],
                children: [
                    { path: 'gallery', component: GalleryPostComponent },
                    { path: 'latest', component: HomePostComponent }
                ]
            },

            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },
];
