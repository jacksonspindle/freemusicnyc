import { useState, useEffect } from 'react';
import { api } from '../api';
import './FilterBar.css';

interface FilterBarProps {
  onFilterChange: (filters: {
    date?: string;
    neighborhood?: string;
    freeOnly?: boolean;
    genre?: string;
  }) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [neighborhoods, setNeighborhoods] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    onFilterChange({
      neighborhood: selectedNeighborhood || undefined,
      genre: selectedGenre || undefined,
      freeOnly,
      date: selectedDate || undefined
    });
  }, [selectedNeighborhood, selectedGenre, freeOnly, selectedDate]);

  const loadFilterOptions = async () => {
    try {
      const [neighborhoodList, genreList] = await Promise.all([
        api.getNeighborhoods(),
        api.getGenres()
      ]);
      setNeighborhoods(neighborhoodList);
      setGenres(genreList);
    } catch (error) {
      console.error('Error loading filter options:', error);
    }
  };

  const handleReset = () => {
    setSelectedNeighborhood('');
    setSelectedGenre('');
    setFreeOnly(false);
    setSelectedDate('');
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="date-filter">Date</label>
        <input
          id="date-filter"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="neighborhood-filter">Neighborhood</label>
        <select
          id="neighborhood-filter"
          value={selectedNeighborhood}
          onChange={(e) => setSelectedNeighborhood(e.target.value)}
          className="filter-select"
        >
          <option value="">All Neighborhoods</option>
          {neighborhoods.map((neighborhood) => (
            <option key={neighborhood} value={neighborhood}>
              {neighborhood}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="genre-filter">Genre</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="filter-checkbox"
          />
          <span>Free Events Only</span>
        </label>
      </div>

      <button onClick={handleReset} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
}
