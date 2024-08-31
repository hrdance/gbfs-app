import { useState, useEffect } from 'react';
import getJSON from './getJSON';

function getFeeds(url) {
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    getJSON(url).then(data => {
      if (data) {
        setFeeds(data.data.en.feeds);
      }
    });
  }, [url]);

  return { feeds };
}

export default getFeeds;