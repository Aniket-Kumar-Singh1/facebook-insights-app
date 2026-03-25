import { useState } from 'react';
import './DateFilter.css';

function DateFilter({ onApply, loading }) {
  const [since, setSince] = useState('');
  const [until, setUntil] = useState('');
  const [error, setError] = useState('');

  const handleApply = () => {
    setError('');

    if (!since || !until) {
      setError('Please select both start and end dates.');
      return;
    }

    const start = new Date(since);
    const end = new Date(until);

    if (start >= end) {
      setError('Start date must be before end date.');
      return;
    }

    const today = new Date();
    if (end > today) {
      setError('End date cannot be in the future.');
      return;
    }

    onApply({ since, until });
  };

  return (
    <div className="date-filter">
      <h3 className="filter-title">Date Range</h3>
      <div className="filter-row">
        <div className="filter-field">
          <label htmlFor="date-since">From</label>
          <input
            id="date-since"
            type="date"
            value={since}
            onChange={(e) => setSince(e.target.value)}
          />
        </div>
        <div className="filter-field">
          <label htmlFor="date-until">To</label>
          <input
            id="date-until"
            type="date"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
          />
        </div>
        <button
          className="apply-btn"
          onClick={handleApply}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Apply'}
        </button>
      </div>
      {error && <p className="filter-error">{error}</p>}
    </div>
  );
}

export default DateFilter;
