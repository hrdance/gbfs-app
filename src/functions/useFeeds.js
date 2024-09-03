import { useState, useEffect } from 'react';

function useFeeds(url) {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const data = await response.json();
        setFeeds(data.data.en.feeds);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching feeds');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { feeds, loading, error };
}

export default useFeeds;
