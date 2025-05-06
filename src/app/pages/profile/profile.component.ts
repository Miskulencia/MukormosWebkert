import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { UsernameUpdateComponent } from "./username-update/username-update.component";
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { DateFormatPipe } from "../../pipes/date-format.pipe";

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    UsernameUpdateComponent,
    CapitalizePipe,
    DateFormatPipe
]
})
export class ProfileComponent implements OnInit {
  username: string | null = null;
  email: string | null = null;
  newUsername: string = ''; // For input binding
  appointments: { bookingDate: string }[] = [];
  isLoading = true;
  showUsernameUpdate = false; // Controls the visibility of the username update component
  lastVisible: any; // For pagination

  constructor(
    private firebaseAuthService: FirebaseAuthService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.email = user.email;
      this.firestoreService.getUsername(user.uid).then((username) => {
        this.username = username || 'Nincs megadva';
      });
      this.loadAppointments(user.uid);
    } else {
      this.email = 'Nincs bejelentkezve';
      this.username = 'Nincs bejelentkezve';
      this.isLoading = false;
    }
  }

  saveUsername() {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.saveUsername(user.uid, this.newUsername).then(() => {
        this.username = this.newUsername;
        this.newUsername = '';
        alert('Felhasználónév sikeresen mentve!');
      }).catch((error) => {
        console.error('Error saving username:', error);
        alert('Hiba történt a felhasználónév mentése közben.');
      });
    }
  }

  loadAppointments(userId: string) {
    this.firestoreService
      .getUserAppointments(userId)
      .then((appointments) => {
        this.appointments = appointments.sort((a, b) =>
          new Date(a.bookingDate).getTime() - new Date(b.bookingDate).getTime()
        );
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading appointments:', error);
        this.isLoading = false;
      });
  }

  loadOrderedAppointments() {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.getUserBookingsOrdered(user.uid).then((appointments) => {
        this.appointments = appointments;
      });
    }
  }

  loadLatestAppointments() {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.getLatestBookings(user.uid).then((appointments) => {
        this.appointments = appointments;
      });
    }
  }

  loadPaginatedAppointments(lastDoc: any) {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.getPaginatedBookings(user.uid, lastDoc).then(({ bookings, lastVisible }) => {
        this.appointments = bookings;
        this.lastVisible = lastVisible; // Save the last document for pagination
      });
    }
  }

  loadAppointmentsInDateRange(startDate: Date, endDate: Date) {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.getBookingsInDateRange(user.uid, startDate, endDate).then((appointments) => {
        this.appointments = appointments;
      });
    }
  }

  toggleUsernameUpdate() {
    this.showUsernameUpdate = !this.showUsernameUpdate; // Toggle visibility
  }

  onUsernameUpdated(newUsername: string) {
    const user = this.firebaseAuthService.getCurrentUser();
    if (user) {
      this.firestoreService.saveUsername(user.uid, newUsername).then(() => {
        this.username = newUsername;
        this.showUsernameUpdate = false; // Hide the update component after saving
        alert('Felhasználónév sikeresen mentve!');
      }).catch((error) => {
        console.error('Error saving username:', error);
        alert('Hiba történt a felhasználónév mentése közben.');
      });
    }
  }

  onCancelUpdate() {
    this.showUsernameUpdate = false; // Hide the update component when canceled
    alert('Felhasználónév frissítése megszakítva.');
  }
}
