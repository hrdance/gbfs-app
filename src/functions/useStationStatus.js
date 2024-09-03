import { useState, useEffect } from 'react';

function useStationStatus(url) {

  const [stationStatus, setStationStatus] = useState([]);
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
        setStationStatus(data.data.stations);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching feeds');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { stationStatus, loading, error };
}

export default useStationStatus;
