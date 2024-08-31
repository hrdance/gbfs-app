import { useState, useEffect } from 'react';
import getJSON from './getJSON';

function getStations(url) {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    getJSON(url).then(data => {
      if (data) {
        setStations(data.data.en.stations);
      }
    });
  }, [url]);

  return { stations };
}

export default getStations;