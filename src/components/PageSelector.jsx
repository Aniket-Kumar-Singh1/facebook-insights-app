import { useState } from 'react';
import './PageSelector.css';

function PageSelector({ pages, onSelect }) {
  const [selectedId, setSelectedId] = useState('');

  if (!pages || pages.length === 0) {
    return <p className="no-pages">No pages found. Make sure you manage at least one Facebook page.</p>;
  }

  const handleSubmit = () => {
    if (!selectedId) return;
    const page = pages.find((p) => p.id === selectedId);
    if (page) onSelect(page);
  };

  return (
    <div className="page-selector">
      <label htmlFor="page-select">Select a Page</label>
      <div className="selector-row">
        <select
          id="page-select"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          <option value="">-- Choose a page --</option>
          {pages.map((page) => (
            <option key={page.id} value={page.id}>
              {page.name}
            </option>
          ))}
        </select>
        <button
          className="submit-btn"
          onClick={handleSubmit}
          disabled={!selectedId}
        >
          Get Insights
        </button>
      </div>
    </div>
  );
}

export default PageSelector;
