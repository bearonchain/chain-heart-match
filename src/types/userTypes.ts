
export interface UserProfile {
  id: string;
  name: string;
  age: number;
  bio: string;
  location: string;
  images: string[];
  interests: string[];
  walletConnected: boolean;
}

export interface Match {
  id: string;
  userId: string;
  matchedUserId: string;
  timestamp: Date;
}
