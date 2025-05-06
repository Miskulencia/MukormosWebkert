import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms'; // Importáljuk az FormsModule-t
import { CommonModule } from '@angular/common'; // Import CommonModule for NgIf

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, CommonModule] // Hozzáadjuk az FormsModule-t
})
export class LoginComponent {
  email: string = ''; // Email input field
  password: string = ''; // Password input field
  errorMessage: string | null = null; // Error message for invalid login

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) {}

  login() {
    this.firebaseAuthService
      .login(this.email, this.password)
      .then(() => {
        console.log('Login successful');
        this.router.navigate(['/']); // Navigate to the home page
      })
      .catch((error) => {
        console.error('Login error:', error);
        this.errorMessage = error.message;
      });
  }

  regisztatiranyit() {
    this.router.navigate(['/regisztracio']); // Navigate to the registration page
  }
}
