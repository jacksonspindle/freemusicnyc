import { Event } from '../types';
import './EventCard.css';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="event-card">
      <div className="event-header">
        <h3 className="event-name">{event.name}</h3>
        {event.isFree && <span className="free-badge">FREE</span>}
      </div>

      <div className="event-venue">
        <span className="venue-icon">🎵</span>
        <strong>{event.venue}</strong>
      </div>

      <div className="event-details">
        <div className="event-detail">
          <span className="detail-icon">📅</span>
          <span>{formatDate(event.date)}</span>
        </div>

        <div className="event-detail">
          <span className="detail-icon">🕐</span>
          <span>{event.time}</span>
        </div>

        <div className="event-detail">
          <span className="detail-icon">📍</span>
          <span>{event.neighborhood}</span>
        </div>

        {event.genre && (
          <div className="event-detail">
            <span className="detail-icon">🎸</span>
            <span>{event.genre}</span>
          </div>
        )}

        {!event.isFree && (
          <div className="event-detail">
            <span className="detail-icon">💵</span>
            <span>{event.price}</span>
          </div>
        )}
      </div>

      {event.description && (
        <p className="event-description">{event.description}</p>
      )}

      <div className="event-footer">
        <p className="event-address">{event.address}</p>
        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="event-link"
          >
            Visit Website →
          </a>
        )}
      </div>
    </div>
  );
}
