import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Route for the homepage
  { path: 'rolunk', component: AboutComponent }, // Public route
  { path: 'idopontfoglalas', component: BookingComponent, canActivate: [AuthGuard] }, // Protected route
  { path: 'bejelentkezes', component: LoginComponent }, // Public route
  { path: 'regisztracio', component: RegistrationComponent }, // Public route
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard] }, // Protected route
  { path: '**', component: NotFoundComponent }, // Wildcard route
];