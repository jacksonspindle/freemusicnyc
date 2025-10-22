import { Event } from '../types';
import { EventCard } from './EventCard';
import './EventList.css';

interface EventListProps {
  events: Event[];
  loading: boolean;
}

export function EventList({ events, loading }: EventListProps) {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🎵</div>
        <h2>No Events Found</h2>
        <p>Try adjusting your filters to see more events</p>
      </div>
    );
  }

  return (
    <div className="event-list">
      <div className="event-count">
        Found {events.length} event{events.length !== 1 ? 's' : ''}
      </div>
      <div className="events-grid">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
