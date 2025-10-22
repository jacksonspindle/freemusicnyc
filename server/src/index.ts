import express, { Request, Response } from 'express';
import cors from 'cors';
import cron from 'node-cron';
import { VenueScraper } from './scrapers/venueScraper';
import { Event } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize scraper
const scraper = new VenueScraper();
let cachedEvents: Event[] = [];

// Scrape events on startup
async function refreshEvents() {
  console.log('Refreshing events...');
  try {
    cachedEvents = await scraper.scrapeAllVenues();
    console.log(`Cached ${cachedEvents.length} events`);
  } catch (error) {
    console.error('Error refreshing events:', error);
  }
}

// Initial scrape
refreshEvents();

// Schedule automatic refresh every 6 hours
cron.schedule('0 */6 * * *', () => {
  console.log('Running scheduled event refresh...');
  refreshEvents();
});

// Routes

/**
 * GET /api/events
 * Get all events or filtered events
 */
app.get('/api/events', (req: Request, res: Response) => {
  try {
    const { date, neighborhood, freeOnly, genre } = req.query;

    const filters = {
      date: date as string | undefined,
      neighborhood: neighborhood as string | undefined,
      freeOnly: freeOnly === 'true',
      genre: genre as string | undefined
    };

    const filteredEvents = scraper.getFilteredEvents(filters);
    res.json({ success: true, count: filteredEvents.length, events: filteredEvents });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch events' });
  }
});

/**
 * GET /api/events/today
 * Get today's events
 */
app.get('/api/events/today', (req: Request, res: Response) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const todayEvents = scraper.getFilteredEvents({ date: today });
    res.json({ success: true, count: todayEvents.length, events: todayEvents });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch today\'s events' });
  }
});

/**
 * GET /api/events/free
 * Get only free events
 */
app.get('/api/events/free', (req: Request, res: Response) => {
  try {
    const freeEvents = scraper.getFilteredEvents({ freeOnly: true });
    res.json({ success: true, count: freeEvents.length, events: freeEvents });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch free events' });
  }
});

/**
 * GET /api/neighborhoods
 * Get list of all neighborhoods
 */
app.get('/api/neighborhoods', (req: Request, res: Response) => {
  try {
    const neighborhoods = scraper.getNeighborhoods();
    res.json({ success: true, neighborhoods });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch neighborhoods' });
  }
});

/**
 * GET /api/genres
 * Get list of all genres
 */
app.get('/api/genres', (req: Request, res: Response) => {
  try {
    const genres = scraper.getGenres();
    res.json({ success: true, genres });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch genres' });
  }
});

/**
 * POST /api/refresh
 * Manually trigger event refresh
 */
app.post('/api/refresh', async (req: Request, res: Response) => {
  try {
    await refreshEvents();
    res.json({ success: true, message: 'Events refreshed successfully', count: cachedEvents.length });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to refresh events' });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    success: true,
    status: 'healthy',
    eventsCount: cachedEvents.length,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🎵 Free Music NYC API Server`);
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🎸 Events cached: ${cachedEvents.length}`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  GET  /api/events - Get all events (with optional filters)`);
  console.log(`  GET  /api/events/today - Get today's events`);
  console.log(`  GET  /api/events/free - Get free events only`);
  console.log(`  GET  /api/neighborhoods - Get list of neighborhoods`);
  console.log(`  GET  /api/genres - Get list of genres`);
  console.log(`  POST /api/refresh - Manually refresh events`);
  console.log(`  GET  /api/health - Health check\n`);
});
