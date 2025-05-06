export interface Booking {
  bookingId?: string; // Optional: Firestore document ID for the booking
  userId: string; // The ID of the user who made the booking
  bookingDate: string; // The date of the booking in ISO format
}
