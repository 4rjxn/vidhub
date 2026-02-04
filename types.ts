
export interface VideoMetadata {
  id: string;
  url: string;
  title: string;
  thumbnail: string;
  addedAt: number;
  aiInsights?: string;
  category?: string;
}

export interface ApiResponse {
  title: string;
  insights: string;
  category: string;
}

export type ViewState = 'login' | 'home';

export interface User {
  email: string;
  name: string;
}
