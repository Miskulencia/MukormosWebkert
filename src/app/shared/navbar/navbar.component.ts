import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Subscription, interval } from 'rxjs'; // Import interval for periodic checks
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, MatIconModule], // Add MatIconModule here
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false; // Tracks login state
  username: string | null = null; // Stores the logged-in user's username
  private subscriptions: Subscription = new Subscription();
  menuOpen = false; // Tracks the state of the dropdown menu
  isMobile = false; // Tracks if the screen is mobile-sized

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial check for logged-in user
    this.updateLoginState();

    // Periodically check for changes in session storage
    const sessionCheck = interval(1000).subscribe(() => {
      this.updateLoginState();
    });
    this.subscriptions.add(sessionCheck);

    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen; // Toggle the menu state
  }

  updateLoginState() {
    const registeredUser = sessionStorage.getItem('registeredUser');
    if (registeredUser) {
      const userData = JSON.parse(registeredUser);
      this.isLoggedIn = true;
      this.username = userData.username; // Use username instead of email
    } else {
      this.isLoggedIn = false;
      this.username = null;
    }
  }

  onLogout() {
    // Clear session storage and reset state
    sessionStorage.removeItem('registeredUser');
    this.isLoggedIn = false;
    this.username = null;
    this.router.navigate(['/bejelentkezes']); // Redirect to login page
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe(); // Clean up subscriptions
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }
}
