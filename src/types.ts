export type Role = 'customer' | 'technician' | 'admin' | null;

export type JobStatus = 'open' | 'quoted' | 'accepted' | 'completed';

export interface User {
  id: string;
  name: string;
  role: 'customer' | 'technician';
  status: 'active' | 'suspended';
  rating?: number;
}

export interface Quote {
  id: string;
  techId: string;
  techName: string;
  techRating: number;
  price: number;
  estimatedTime: string;
}

export interface Job {
  id: string;
  customerId: string;
  customerName: string;
  serviceType: string;
  description: string;
  location: string;
  status: JobStatus;
  quotes: Quote[];
  acceptedQuoteId?: string;
  createdAt: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}
