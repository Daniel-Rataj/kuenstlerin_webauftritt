import { Routes } from '@angular/router';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutmeComponent } from './pages/aboutme/aboutme.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'aboutme', component: AboutmeComponent },
  { path: 'contact', component: ContactComponent },
];
