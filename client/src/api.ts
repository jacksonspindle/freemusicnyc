import { Event } from './types';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  /**
   * Fetch all events with optional filters
   */
  async getEvents(filters?: {
    date?: string;
    neighborhood?: string;
    freeOnly?: boolean;
    genre?: string;
  }): Promise<Event[]> {
    const params = new URLSearchParams();
    if (filters?.date) params.append('date', filters.date);
    if (filters?.neighborhood) params.append('neighborhood', filters.neighborhood);
    if (filters?.freeOnly) params.append('freeOnly', 'true');
    if (filters?.genre) params.append('genre', filters.genre);

    const url = `${API_BASE_URL}/events${params.toString() ? '?' + params.toString() : ''}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.events || [];
  },

  /**
   * Fetch today's events
   */
  async getTodayEvents(): Promise<Event[]> {
    const response = await fetch(`${API_BASE_URL}/events/today`);
    const data = await response.json();
    return data.events || [];
  },

  /**
   * Fetch only free events
   */
  async getFreeEvents(): Promise<Event[]> {
    const response = await fetch(`${API_BASE_URL}/events/free`);
    const data = await response.json();
    return data.events || [];
  },

  /**
   * Get list of neighborhoods
   */
  async getNeighborhoods(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/neighborhoods`);
    const data = await response.json();
    return data.neighborhoods || [];
  },

  /**
   * Get list of genres
   */
  async getGenres(): Promise<string[]> {
    const response = await fetch(`${API_BASE_URL}/genres`);
    const data = await response.json();
    return data.genres || [];
  },

  /**
   * Manually refresh events
   */
  async refreshEvents(): Promise<void> {
    await fetch(`${API_BASE_URL}/refresh`, { method: 'POST' });
  }
};
