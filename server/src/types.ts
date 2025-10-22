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

export interface Venue {
  name: string;
  address: string;
  neighborhood: string;
  website?: string;
}
