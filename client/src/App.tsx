import { useState, useEffect } from 'react';
import { FilterBar } from './components/FilterBar';
import { EventList } from './components/EventList';
import { api } from './api';
import { Event } from './types';
import './App.css';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<{
    date?: string;
    neighborhood?: string;
    freeOnly?: boolean;
    genre?: string;
  }>({});

  useEffect(() => {
    loadEvents();
  }, [filters]);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await api.getEvents(filters);
      setEvents(data);
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    try {
      await api.refreshEvents();
      await loadEvents();
    } catch (error) {
      console.error('Error refreshing events:', error);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="music-icon">🎸</span>
            Free Music NYC
          </h1>
          <p className="app-subtitle">
            Discover free live music across New York City
          </p>
        </div>
        <button onClick={handleRefresh} className="refresh-button">
          🔄 Refresh Events
        </button>
      </header>

      <main className="app-main">
        <FilterBar onFilterChange={setFilters} />
        <EventList events={events} loading={loading} />
      </main>

      <footer className="app-footer">
        <p>
          Built with React + TypeScript |
          Data refreshes automatically every 6 hours
        </p>
      </footer>
    </div>
  );
}

export default App;
