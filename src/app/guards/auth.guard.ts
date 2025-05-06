import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseAuthService } from '../services/firebase-auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: FirebaseAuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getCurrentUser();
    if (user) {
      return true; // Allow access if the user is authenticated
    } else {
      this.router.navigate(['/bejelentkezes']); // Redirect to login page if not authenticated
      return false;
    }
  }
}
