export interface Review {
  reviewId?: string; // Optional: Firestore document ID for the review
  userId: string; // The ID of the user who wrote the review
  serviceId: string; // The ID of the service being reviewed
  rating: number; // The rating given by the user (e.g., 1-5)
  comment: string; // The review comment
  createdAt: string; // The date the review was created in ISO format
}
