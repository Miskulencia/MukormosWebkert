import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false); // Reactive state
  isLoggedIn$ = this.isLoggedInSubject.asObservable(); // Observable for components to subscribe to

  private usernameSubject = new BehaviorSubject<string | null>(null); // Reactive username state
  username$ = this.usernameSubject.asObservable(); // Observable for components to subscribe to

  constructor() {}

  login(username: string) {
    this.isLoggedInSubject.next(true); // Update state to logged in
    this.usernameSubject.next(username); // Update username
  }

  logout() {
    this.isLoggedInSubject.next(false); // Update state to logged out
    this.usernameSubject.next(null); // Clear username
  }
}
