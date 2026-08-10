export interface FeedbackSubmission {
  rating: number;
  liked: string;
  improve: string;
  contactEmail?: string;
}

export interface ContactSubmission {
  fullName: string;
  email: string;
  phone?: string;
  mandalName?: string;
  message: string;
}

export interface MailDispatchResult {
  delivered: boolean;
  queuedLocally: boolean;
  error?: string;
}
