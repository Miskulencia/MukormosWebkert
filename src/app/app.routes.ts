import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'rolunk', component: AboutComponent },
  { path: 'idopontfoglalas', component: BookingComponent },
  { path: 'bejelentkezes', component: LoginComponent },
  { path: 'regisztracio', component: RegistrationComponent }, // Registration route
  { path: '**', component: NotFoundComponent } // Wildcard route for non-existent paths
];
