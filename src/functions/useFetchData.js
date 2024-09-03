import { useState, useEffect } from 'react';

function useFetchData(baseURL) {
  const [allStations, setAllStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const feedsResponse = await fetch(baseURL);
        if (!feedsResponse.ok) throw new Error(`HTTP error: ${feedsResponse.status}`);
        const feedsData = await feedsResponse.json();
        const feeds = feedsData.data.en.feeds || [];

        const stationInformationURL = feeds.find(feed => feed.name === 'station_information')?.url;
        const stationStatusURL = feeds.find(feed => feed.name === 'station_status')?.url;

        if (!stationInformationURL || !stationStatusURL) {
          throw new Error('URLs for station information or station status not found.');
        }

        const [stationInfoResponse, stationStatusResponse] = await Promise.all([
          fetch(stationInformationURL),
          fetch(stationStatusURL),
        ]);

        if (!stationInfoResponse.ok) throw new Error(`HTTP error: ${stationInfoResponse.status}`);
        if (!stationStatusResponse.ok) throw new Error(`HTTP error: ${stationStatusResponse.status}`);

        const stationInfoData = await stationInfoResponse.json();
        const stationStatusData = await stationStatusResponse.json();

        const stationInformation = stationInfoData.data.stations || [];
        const stationStatus = stationStatusData.data.stations || [];

        const statusMap = new Map(stationStatus.map(status => [status.station_id, status]));
        const mergedStations = stationInformation.map(info => {
          const status = statusMap.get(info.station_id) || {};
          return {
            ...info,
            ...status
          };
        });

        const sortedStations = mergedStations.sort((a, b) => a.name.localeCompare(b.name));
        setAllStations(sortedStations);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'An error occurred while fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return { allStations, loading, error };
}

export default useFetchData;
