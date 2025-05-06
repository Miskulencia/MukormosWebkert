import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, Auth, onAuthStateChanged, signOut, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  private auth: Auth;
  private currentUser: User | null = null;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyDY79CLR74dcC5MAe4kFJGDywmNj6d4Dzs',
      authDomain: 'mukormosidopont.firebaseapp.com',
      projectId: 'mukormosidopont',
      storageBucket: 'mukormosidopont.firebasestorage.app',
      messagingSenderId: '676337659896',
      appId: '1:676337659896:web:b638874c53db598d6fb00d',
      measurementId: 'G-BFVYVLWLJE',
    };

    const app = initializeApp(firebaseConfig);
    this.auth = getAuth(app);

    // Listen for authentication state changes
    onAuthStateChanged(this.auth, (user) => {
      this.currentUser = user;
    });
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getAuthState(callback: (user: User | null) => void) {
    return onAuthStateChanged(this.auth, callback);
  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
