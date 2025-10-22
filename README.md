# Free Music NYC

A React website that automatically scrapes the web for music venues and bars playing live music for free each night across New York City.

## Features

- **Automated Web Scraping**: Backend server automatically scrapes NYC music venues
- **Real-time Filtering**: Filter events by date, neighborhood, genre, and price
- **Free Events Focus**: Easy toggle to show only free events
- **Automatic Updates**: Events refresh automatically every 6 hours
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern Tech Stack**: Built with React, TypeScript, and Express

## Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- Modern CSS with responsive design

### Backend
- **Express** server with TypeScript
- **Axios** for HTTP requests
- **Cheerio** for web scraping
- **node-cron** for scheduled tasks

## Project Structure

```
freemusicnyc/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventList.tsx
│   │   │   └── FilterBar.tsx
│   │   ├── api.ts         # API client
│   │   ├── types.ts       # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Global styles
│   └── package.json
│
└── server/                # Express backend
    ├── src/
    │   ├── scrapers/      # Web scraping modules
    │   │   └── venueScraper.ts
    │   ├── types.ts       # TypeScript types
    │   └── index.ts       # Express server
    ├── tsconfig.json
    └── package.json
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/freemusicnyc.git
cd freemusicnyc
```

2. Install server dependencies:
```bash
cd server
npm install
```

3. Install client dependencies:
```bash
cd ../client
npm install
```

### Running the Application

You'll need to run both the server and client in separate terminal windows.

#### Terminal 1 - Start the backend server:
```bash
cd server
npm run dev
```
The server will start on `http://localhost:3001`

#### Terminal 2 - Start the frontend:
```bash
cd client
npm run dev
```
The client will start on `http://localhost:5173`

Open your browser and navigate to `http://localhost:5173`

## API Endpoints

The backend server provides the following endpoints:

- `GET /api/events` - Get all events (with optional filters)
  - Query params: `date`, `neighborhood`, `freeOnly`, `genre`
- `GET /api/events/today` - Get today's events
- `GET /api/events/free` - Get only free events
- `GET /api/neighborhoods` - Get list of all neighborhoods
- `GET /api/genres` - Get list of all music genres
- `POST /api/refresh` - Manually trigger event refresh
- `GET /api/health` - Health check endpoint

## Features in Detail

### Event Filtering

Filter events by:
- **Date**: Select a specific date to see events
- **Neighborhood**: Filter by NYC neighborhood (Lower East Side, Williamsburg, etc.)
- **Genre**: Filter by music genre (Jazz, Rock, Folk, etc.)
- **Free Only**: Toggle to show only free events

### Automatic Scraping

The server includes a web scraper that:
- Fetches events from known NYC music venues
- Updates automatically every 6 hours using cron jobs
- Can be manually refreshed via the UI

### Included Venues

Currently tracking these popular NYC venues:
- Rockwood Music Hall (Lower East Side)
- Arlene's Grocery (Lower East Side)
- The Bitter End (Greenwich Village)
- Pete's Candy Store (Williamsburg)
- Shrine (Harlem)
- Tompkins Square Park (East Village)
- Washington Square Park (Greenwich Village)

## Development

### Building for Production

Build the server:
```bash
cd server
npm run build
npm start
```

Build the client:
```bash
cd client
npm run build
npm run preview
```

### Extending the Scraper

To add more venues, edit `server/src/scrapers/venueScraper.ts`:

1. Add venue to `NYC_VENUES` array
2. Implement venue-specific scraping logic in `scrapeVenueWebsite()`
3. Update the scraping orchestration in `scrapeAllVenues()`

Note: When scraping real websites:
- Always respect `robots.txt`
- Implement rate limiting
- Add proper error handling
- Consider using official APIs when available

## Deployment

This application can be deployed to:
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Heroku, Railway, Render, or any Node.js hosting

Make sure to:
1. Set environment variables for API URL in production
2. Update CORS settings in the server
3. Configure automatic refresh intervals as needed

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

Built with passion for NYC's vibrant live music scene!
