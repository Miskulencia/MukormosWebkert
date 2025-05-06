import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FirestoreService } from '../../services/firestore.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule // Add CommonModule to imports
  ]
})
export class BookingComponent {
  selectedDate: Date | null = null; // Store the selected date
  lastClickedDate: Date | null = null; // Store the last clicked date

  constructor(private firestoreService: FirestoreService) {}

  bookAppointment() {
    if (this.selectedDate) {
      this.firestoreService.saveBooking(this.selectedDate)
        .then(() => {
          console.log('Booking saved successfully');
          alert(`Foglalás sikeres a következő napra: ${this.selectedDate?.toLocaleDateString() ?? 'ismeretlen dátum'}`);
        })
        .catch((error) => {
          console.error('Error saving booking:', error);
          alert('Hiba történt a foglalás mentése közben.');
        });
    } else {
      alert('Kérjük, válasszon egy napot a foglaláshoz!');
    }
  }

  dateClass = (date: Date) => {
    if (this.lastClickedDate && date.toDateString() === this.lastClickedDate.toDateString()) {
      return 'last-clicked-date'; // Highlight the last clicked date
    }
    if (this.selectedDate && date.toDateString() === this.selectedDate.toDateString()) {
      return 'selected-date'; // Highlight the selected date
    }
    return '';
  };

  onDateSelected(date: Date | null) {
    if (date) {
      this.lastClickedDate = date; // Update the last clicked date
      this.selectedDate = date; // Update the selected date
    }
  }
}