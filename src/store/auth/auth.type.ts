export interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  plan: 'FREE' | 'PRO' | 'BUSINESS';
  creditsRemaining: number;
  isEmailVerified: boolean;
  createdAt: string;
}