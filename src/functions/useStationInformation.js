import { useState, useEffect } from 'react';
import getJSON from './getJSON';

function useStationInformation(url) {

  const [stationInformation, setStationInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getJSON(url);
        if (data) {
          setStationInformation(data.data.stations);
        }
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { stationInformation, loading, error };
}

export default useStationInformation;
