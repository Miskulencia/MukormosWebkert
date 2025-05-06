import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firebaseConfig = {
    apiKey: 'AIzaSyDY79CLR74dcC5MAe4kFJGDywmNj6d4Dzs',
    authDomain: 'mukormosidopont.firebaseapp.com',
    projectId: 'mukormosidopont',
    storageBucket: 'mukormosidopont.firebasestorage.app',
    messagingSenderId: '676337659896',
    appId: '1:676337659896:web:b638874c53db598d6fb00d',
    measurementId: 'G-BFVYVLWLJE',
  };

  constructor() {
    const app = initializeApp(this.firebaseConfig);
    getAnalytics(app);
    console.log('Firebase initialized');
  }
}
