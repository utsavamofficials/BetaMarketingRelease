export type UserRole = 'organizer' | 'collector';

export interface OrganizerProfile {
  id: string;
  role: 'organizer';
  fullName: string;
  mandalName: string;
  phone: string;
  email: string;
  city: string;
  planId: 'base' | 'satisfy';
  createdAt: string;
}

export interface CollectorProfile {
  id: string;
  role: 'collector';
  fullName: string;
  phone: string;
  pin: string;
  mandalId: string;
  createdAt: string;
}

export type AuthUser = OrganizerProfile | CollectorProfile;
