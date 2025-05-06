<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mukormosidopont2';
  username: string | null = null; // Tárolja az aktuális felhasználónevet
  private subscription!: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Feliratkozunk a username$-re, hogy mindig a legfrissebb értéket kapjuk
    this.subscription = this.authService.username$.subscribe((name) => {
      this.username = name;
    });
  }

  onLogout() {
    this.authService.logout(); // Kijelentkezés
    console.log('Kijelentkezés megtörtént');
  }

  ngOnDestroy() {
    // Feliratkozás megszüntetése memória szivárgás elkerülése érdekében
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, MatToolbarModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mukormosidopont2';
  username: string | null = null; // Tárolja az aktuális felhasználónevet
  private subscription!: Subscription;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    // Feliratkozunk a username$-re, hogy mindig a legfrissebb értéket kapjuk
    this.subscription = this.authService.username$.subscribe((name) => {
      this.username = name;
    });
  }

  onLogout() {
    this.authService.logout(); // Kijelentkezés
    console.log('Kijelentkezés megtörtént');
  }

  ngOnDestroy() {
    // Feliratkozás megszüntetése memória szivárgás elkerülése érdekében
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
>>>>>>> master
