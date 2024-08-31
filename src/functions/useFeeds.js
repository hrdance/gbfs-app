import { useState, useEffect } from 'react';
import getJSON from './getJSON';

function useFeeds(url) {

  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getJSON(url);
        if (data) {
          setFeeds(data.data.en.feeds);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { feeds, loading, error };
}

export default useFeeds;
