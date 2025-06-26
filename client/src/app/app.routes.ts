import { Routes } from '@angular/router';
import { LoginComponent } from './layout/login/login.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { authGuard } from './configs/guards/auth.guard';
import { roleGuard } from './configs/guards/role.guard';
import { UserManagementComponent } from './layout/dashboard/admin/user-management/user-management.component';
import { InsightsComponent } from './layout/dashboard/admin/insights/insights.component';
import { GalleryPostComponent } from './layout/dashboard/moderator/gallery-post/gallery-post.component';
import { UserRole } from './models/enums/user-role';
import { HomePostComponent } from './layout/dashboard/moderator/home-post/home-post.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExhibitionCreateWizardComponent } from './layout/dashboard/moderator/gallery-post/exhibition-formular/exhibition-create-wizard/exhibition-create-wizard.component';
import { DashboardLayoutComponent } from './layout/dashboard-layout/dashboard-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';
import { loginRedirectGuard } from './configs/guards/login-redirect.guard';
import { ImpressumComponent } from './pages/impressum/impressum.component';
import { DatenschutzComponent } from './pages/datenschutz/datenschutz.component';

export const routes: Routes = [
    // Public Region
    {
        path: '',
        component: PublicLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'gallery', component: GalleryComponent },
            { path: 'aboutme', component: AboutmeComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'impressum', component: ImpressumComponent },
            { path: 'datenschutz', component: DatenschutzComponent },
            { path: 'login', component: LoginComponent, canActivate: [loginRedirectGuard]},
        ],
    },

    // Protected Region for authenticated Users (Admin, Moderator, etc.)
    {
        path: 'dashboard',
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            // Shared Homepage (different cards, depending on role)
            { path: 'home', component: DashboardComponent },

            // Admin-Routes
            {
                path: 'admin',
                canActivate: [roleGuard([UserRole.Admin])],
                children: [
                    { path: 'users', component: UserManagementComponent },
                    { path: 'insights', component: InsightsComponent },
                ],
            },

            // Moderator-Routes
            {
                path: 'moderator',
                canActivate: [roleGuard([UserRole.Moderator])],
                children: [
                    { path: 'gallery', component: GalleryPostComponent },
                    { path: 'latest', component: HomePostComponent },
                    { path: 'exhibition/create', component: ExhibitionCreateWizardComponent },
                    { path: 'exhibition/:id', component: ExhibitionCreateWizardComponent},
                ],
            },

            // forwards /dashboard to /dashboard/home
            { path: '', redirectTo: 'home', pathMatch: 'full' },
        ],
    },
];