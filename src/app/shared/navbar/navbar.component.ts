import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Tracks login state
  username: string | null = null; // Stores the logged-in user's username
  private authUnsubscribe: (() => void) | null = null;
  menuOpen = false; // Tracks the state of the dropdown menu
  isMobile = false; // Tracks if the screen is mobile-sized

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) {}

  ngOnInit() {
    // Listen for authentication state changes
    this.authUnsubscribe = this.firebaseAuthService.getAuthState((user) => {
      this.isLoggedIn = !!user;
      this.username = user?.email || null;
    });

    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle the menu state
  }

  onLogout() {
    this.firebaseAuthService.logout().then(() => {
      this.isLoggedIn = false;
      this.username = null;
      this.router.navigate(['/bejelentkezes']); // Redirect to login page
    });
  }

  ngOnDestroy() {
    if (this.authUnsubscribe) {
      this.authUnsubscribe();
    }
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }
}