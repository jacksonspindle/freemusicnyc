import axios from 'axios';
import * as cheerio from 'cheerio';
import { Event, Venue } from '../types';

// Known NYC venues that frequently have free live music
const NYC_VENUES: Venue[] = [
  {
    name: "Rockwood Music Hall",
    address: "196 Allen St, New York, NY 10002",
    neighborhood: "Lower East Side",
    website: "https://www.rockwoodmusichall.com"
  },
  {
    name: "Arlene's Grocery",
    address: "95 Stanton St, New York, NY 10002",
    neighborhood: "Lower East Side",
    website: "https://www.arlenesgrocery.net"
  },
  {
    name: "The Bitter End",
    address: "147 Bleecker St, New York, NY 10012",
    neighborhood: "Greenwich Village",
    website: "https://www.bitterend.com"
  },
  {
    name: "Pete's Candy Store",
    address: "709 Lorimer St, Brooklyn, NY 11211",
    neighborhood: "Williamsburg",
    website: "https://petescandystore.com"
  },
  {
    name: "Shrine",
    address: "2271 Adam Clayton Powell Jr Blvd, New York, NY 10030",
    neighborhood: "Harlem",
    website: "https://www.shrinenyc.com"
  },
  {
    name: "Tompkins Square Park",
    address: "E 7th St & Avenue A, New York, NY 10009",
    neighborhood: "East Village",
  },
  {
    name: "Washington Square Park",
    address: "Washington Square, New York, NY 10012",
    neighborhood: "Greenwich Village",
  }
];

/**
 * Scrapes events from various NYC venues
 * Note: This is a demo implementation. Real scraping would need:
 * - Respect robots.txt
 * - Rate limiting
 * - Error handling for dynamic content
 * - API keys where required
 */
export class VenueScraper {
  private events: Event[] = [];

  /**
   * Generate sample events for demonstration
   * In production, this would scrape real venue websites
   */
  private generateSampleEvents(): Event[] {
    const events: Event[] = [];
    const today = new Date();
    const genres = ['Jazz', 'Rock', 'Folk', 'Blues', 'Indie', 'Acoustic', 'Hip-Hop'];

    // Generate events for the next 7 days
    for (let i = 0; i < 7; i++) {
      const eventDate = new Date(today);
      eventDate.setDate(today.getDate() + i);
      const dateString = eventDate.toISOString().split('T')[0];

      // Each venue gets 1-2 events per week
      NYC_VENUES.forEach((venue, idx) => {
        if (i % (idx + 2) === 0) {
          const isFree = Math.random() > 0.3; // 70% chance of being free
          const eventNumber = Math.floor(Math.random() * 1000);

          events.push({
            id: `${venue.name.replace(/\s/g, '-')}-${dateString}-${eventNumber}`,
            venue: venue.name,
            name: `Live Music Night ${eventNumber}`,
            date: dateString,
            time: ['7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'][Math.floor(Math.random() * 4)],
            price: isFree ? 'Free' : `$${Math.floor(Math.random() * 20) + 5}`,
            isFree,
            address: venue.address,
            neighborhood: venue.neighborhood,
            genre: genres[Math.floor(Math.random() * genres.length)],
            description: isFree
              ? 'Free live music! Come enjoy great performances in an intimate setting.'
              : 'Live music performance featuring local and touring artists.',
            url: venue.website
          });
        }
      });
    }

    return events.sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Example of how to scrape a real website
   * This is commented out as it requires the actual website structure
   */
  private async scrapeVenueWebsite(url: string): Promise<Event[]> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FreeMusicNYC/1.0)'
        },
        timeout: 5000
      });

      const $ = cheerio.load(response.data);
      const events: Event[] = [];

      // Example scraping logic (would need to be customized per venue)
      // $('.event-item').each((i, elem) => {
      //   const name = $(elem).find('.event-name').text();
      //   const date = $(elem).find('.event-date').text();
      //   const price = $(elem).find('.event-price').text();
      //   // ... parse and create Event object
      // });

      return events;
    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      return [];
    }
  }

  /**
   * Main method to get all events
   * In production, this would orchestrate real scraping from multiple sources
   */
  async scrapeAllVenues(): Promise<Event[]> {
    console.log('Fetching NYC live music events...');

    // For demo purposes, use generated sample data
    this.events = this.generateSampleEvents();

    // In production, you would uncomment and implement:
    // const scrapingPromises = NYC_VENUES
    //   .filter(v => v.website)
    //   .map(v => this.scrapeVenueWebsite(v.website!));
    //
    // const scrapedEvents = await Promise.all(scrapingPromises);
    // this.events = scrapedEvents.flat();

    return this.events;
  }

  /**
   * Get events filtered by criteria
   */
  getFilteredEvents(filters: {
    date?: string;
    neighborhood?: string;
    freeOnly?: boolean;
    genre?: string;
  }): Event[] {
    let filtered = [...this.events];

    if (filters.date) {
      filtered = filtered.filter(e => e.date === filters.date);
    }

    if (filters.neighborhood) {
      filtered = filtered.filter(e =>
        e.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
      );
    }

    if (filters.freeOnly) {
      filtered = filtered.filter(e => e.isFree);
    }

    if (filters.genre) {
      filtered = filtered.filter(e =>
        e.genre?.toLowerCase().includes(filters.genre!.toLowerCase())
      );
    }

    return filtered;
  }

  /**
   * Get unique neighborhoods
   */
  getNeighborhoods(): string[] {
    return [...new Set(this.events.map(e => e.neighborhood))].sort();
  }

  /**
   * Get unique genres
   */
  getGenres(): string[] {
    return [...new Set(this.events.map(e => e.genre).filter(Boolean))].sort();
  }
}
