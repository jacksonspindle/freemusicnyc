export interface Event {
  id: string;
  venue: string;
  name: string;
  date: string;
  time: string;
  price: string;
  isFree: boolean;
  address: string;
  neighborhood: string;
  genre?: string;
  description?: string;
  url?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
