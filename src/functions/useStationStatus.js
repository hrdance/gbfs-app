import { useState, useEffect } from 'react';
import getJSON from './getJSON';

function useStationStatus(url) {

  const [stationStatus, setStationStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getJSON(url);
        if (data) {
          setStationStatus(data.data.stations);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { stationStatus, loading, error };
}

export default useStationStatus;
