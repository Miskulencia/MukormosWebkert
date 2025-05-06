<<<<<<< HEAD
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule] // Add CommonModule
})
export class RegistrationComponent {
  email: string = ''; // Add email property to bind with ngModel
  password: string = ''; // Add password property to bind with ngModel
  username: string = ''; // Add username property to bind with ngModel
  errorMessage: string | null = null; // Add error message property

  constructor(private router: Router) {} // Inject Router service

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form); // Debug log
    if (form.valid) {
      // Save user data to session storage
      const userData = {
        username: this.username,
        email: this.email,
        password: this.password
      };
      sessionStorage.setItem('registeredUser', JSON.stringify(userData));
      console.log('User registered successfully:', userData);

      // Navigate to the login page
      this.router.navigate(['/bejelentkezes']);
    } else {
      console.error('Form is invalid');
      this.errorMessage = 'Kérjük, töltse ki helyesen az összes mezőt!';
      form.controls['username']?.markAsTouched();
      form.controls['email']?.markAsTouched();
      form.controls['password']?.markAsTouched();
      form.controls['confirm-password']?.markAsTouched();
    }
  }
}
=======
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm } from '@angular/forms'; // Import FormsModule and NgForm for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf
import { FirebaseAuthService } from '../../services/firebase-auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule] // Add CommonModule
})
export class RegistrationComponent {
  email: string = ''; // Add email property to bind with ngModel
  password: string = ''; // Add password property to bind with ngModel
  username: string = ''; // Add username property to bind with ngModel
  errorMessage: string | null = null; // Add error message property

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) {} // Inject Router and FirebaseAuthService

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.firebaseAuthService
        .register(this.email, this.password)
        .then(() => {
          console.log('User registered successfully');
          this.router.navigate(['/bejelentkezes']);
        })
        .catch((error) => {
          console.error('Registration error:', error);
          this.errorMessage = error.message;
        });
    } else {
      this.errorMessage = 'Kérjük, töltse ki helyesen az összes mezőt!';
    }
  }
}
>>>>>>> master
