import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, doc, setDoc, getDoc, deleteDoc, orderBy, limit, startAfter, QueryDocumentSnapshot } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db = getFirestore(initializeApp({
    apiKey: 'AIzaSyDY79CLR74dcC5MAe4kFJGDywmNj6d4Dzs',
    authDomain: 'mukormosidopont.firebaseapp.com',
    projectId: 'mukormosidopont',
    storageBucket: 'mukormosidopont.firebasestorage.app',
    messagingSenderId: '676337659896',
    appId: '1:676337659896:web:b638874c53db598d6fb00d',
    measurementId: 'G-BFVYVLWLJE',
  }));

  // Create: Save a booking
  async saveBooking(date: Date): Promise<void> {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error('User is not logged in');
    }

    const bookingData = {
      userId: user.uid,
      bookingDate: date.toISOString(),
    };

    const bookingsCollection = collection(this.db, 'bookings');
    await addDoc(bookingsCollection, bookingData);
  }

  // Read: Get user appointments
  async getUserAppointments(userId: string): Promise<{ bookingDate: string }[]> {
    const bookingsCollection = collection(this.db, 'bookings');
    const q = query(bookingsCollection, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as { bookingDate: string });
  }

  // Update: Save or update username
  async saveUsername(userId: string, username: string): Promise<void> {
    const userDoc = doc(this.db, 'users', userId);
    await setDoc(userDoc, { username }, { merge: true });
  }

  // Read: Get username
  async getUsername(userId: string): Promise<string | null> {
    const userDoc = doc(this.db, 'users', userId);
    const docSnap = await getDoc(userDoc);
    return docSnap.exists() ? (docSnap.data()['username'] as string) : null;
  }

  // Delete: Delete a booking
  async deleteBooking(bookingId: string): Promise<void> {
    const bookingDoc = doc(this.db, 'bookings', bookingId);
    await deleteDoc(bookingDoc);
  }

  // 1. Get bookings for a user, ordered by date
  async getUserBookingsOrdered(userId: string): Promise<{ bookingDate: string }[]> {
    const bookingsCollection = collection(this.db, 'bookings');
    const q = query(
      bookingsCollection,
      where('userId', '==', userId),
      orderBy('bookingDate', 'asc') // Order by booking date in ascending order
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as { bookingDate: string });
  }

  // 2. Get the latest 5 bookings for a user
  async getLatestBookings(userId: string): Promise<{ bookingDate: string }[]> {
    const bookingsCollection = collection(this.db, 'bookings');
    const q = query(
      bookingsCollection,
      where('userId', '==', userId),
      orderBy('bookingDate', 'desc'), // Order by booking date in descending order
      limit(5) // Limit to the latest 5 bookings
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as { bookingDate: string });
  }

  // 3. Paginate bookings for a user (e.g., 5 per page)
  async getPaginatedBookings(userId: string, lastDoc: QueryDocumentSnapshot | null): Promise<{ bookings: { bookingDate: string }[], lastVisible: QueryDocumentSnapshot | null }> {
    const bookingsCollection = collection(this.db, 'bookings');
    let q;

    if (lastDoc) {
      q = query(
        bookingsCollection,
        where('userId', '==', userId),
        orderBy('bookingDate', 'asc'),
        startAfter(lastDoc), // Start after the last document from the previous query
        limit(5) // Limit to 5 bookings per page
      );
    } else {
      q = query(
        bookingsCollection,
        where('userId', '==', userId),
        orderBy('bookingDate', 'asc'),
        limit(5) // Limit to 5 bookings per page
      );
    }

    const querySnapshot = await getDocs(q);
    const bookings = querySnapshot.docs.map((doc) => doc.data() as { bookingDate: string });
    const lastVisible = querySnapshot.docs.length > 0 ? querySnapshot.docs[querySnapshot.docs.length - 1] : null;

    return { bookings, lastVisible };
  }

  // 4. Get bookings within a specific date range
  async getBookingsInDateRange(userId: string, startDate: Date, endDate: Date): Promise<{ bookingDate: string }[]> {
    const bookingsCollection = collection(this.db, 'bookings');
    const q = query(
      bookingsCollection,
      where('userId', '==', userId),
      where('bookingDate', '>=', startDate.toISOString()), // Start date condition
      where('bookingDate', '<=', endDate.toISOString()), // End date condition
      orderBy('bookingDate', 'asc') // Order by booking date in ascending order
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as { bookingDate: string });
  }
}
