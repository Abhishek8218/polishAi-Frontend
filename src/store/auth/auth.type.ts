export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  creditsRemaining: number;
  creditsResetDate: string | null;
  isEmailVerified: boolean;
  createdAt: string;
}