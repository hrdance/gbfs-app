import { useState, useEffect } from 'react';

function useFetchData(baseURL) {
  const [allStations, setAllStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch feed information
        const feedsResponse = await fetch(baseURL);
        if (!feedsResponse.ok) throw new Error(`HTTP error: ${feedsResponse.status}`);
        const feedsData = await feedsResponse.json();
        const feeds = feedsData.data.en.feeds || [];

        // Get feed URLs
        const stationInformationURL = feeds.find(feed => feed.name === 'station_information')?.url;
        const stationStatusURL = feeds.find(feed => feed.name === 'station_status')?.url;

        // Error handling for missing URLs
        if (!stationInformationURL || !stationStatusURL) {
          throw new Error('URLs for feeds not found.');
        }

        // Fetch data from feeds
        const [stationInfoResponse, stationStatusResponse] = await Promise.all([
          fetch(stationInformationURL),
          fetch(stationStatusURL),
        ]);

        // Error handling
        if (!stationInfoResponse.ok) throw new Error(`HTTP error: ${stationInfoResponse.status}`);
        if (!stationStatusResponse.ok) throw new Error(`HTTP error: ${stationStatusResponse.status}`);

        // Parse JSON
        const stationInfoData = await stationInfoResponse.json();
        const stationStatusData = await stationStatusResponse.json();

        // Extract relevant data
        const stationInformation = stationInfoData.data?.stations || [];
        const stationStatus = stationStatusData.data?.stations || [];

        // Map for bike counts
        const bikeCountsMap = {};

        // Populate bike counts
        stationStatus.forEach(station => {
          const { station_id, vehicle_types_available } = station;

          // Initialize station entry if it doesn't exist
          if (!bikeCountsMap[station_id]) {
            bikeCountsMap[station_id] = { bbe: 0, beryl_bike: 0 }; // Default bike types
          }

          // Populate bike counts based on vehicle_types_available
          vehicle_types_available.forEach(type => {
            const { vehicle_type_id, count } = type;
            if (bikeCountsMap[station_id][vehicle_type_id] !== undefined) {
              bikeCountsMap[station_id][vehicle_type_id] = count;
            }
          });
        });

        // Merge data
        const statusMap = new Map(stationStatus.map(status => [status.station_id, status]));
        const mergedStations = stationInformation.map(info => {
          const status = statusMap.get(info.station_id) || {};
          const bikeCounts = bikeCountsMap[info.station_id] || { bbe: 0, beryl_bike: 0 };
          return {
            ...info,
            ...status,
            ...bikeCounts,
          };
        });

        // Sort stations alphabetically
        const sortedStations = mergedStations.sort((a, b) => a.name.localeCompare(b.name));
        setAllStations(sortedStations);
        setLoading(false);

        console.log(sortedStations);

      } catch (err) {
        console.error(err);
        setError(err.message || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [baseURL]);

  return { allStations, loading, error };
}

export default useFetchData;
