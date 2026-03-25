import { useState, useCallback } from 'react';
import { getPageInsights } from '../services/api';

function useInsights() {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = useCallback(async (pageId, pageToken, dateRange) => {
    setLoading(true);
    setError(null);
    setInsights(null);

    try {
      const data = await getPageInsights(pageId, pageToken, dateRange);
      setInsights(data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  }, []);

  return { insights, loading, error, fetchInsights };
}

export default useInsights;
