import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    const registeredUser = sessionStorage.getItem('registeredUser');
    if (registeredUser) {
      const userData = JSON.parse(registeredUser);
      if (userData.email === this.email && userData.password === this.password) {
        console.log('Login successful');
        this.router.navigate(['/']); // Navigate to the home page
      } else {
        this.errorMessage = 'Hibás email vagy jelszó!';
        console.error('Invalid email or password');
      }
    } else {
      this.errorMessage = 'Nincs regisztrált felhasználó!';
      console.error('No registered user found');
    }
  }

  regisztatiranyit() {
    this.router.navigate(['/regisztracio']); // Navigate to the registration page
  }
}
