import { useState, useEffect } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import useFeeds from './functions/useFeeds';
import useStationInformation from './functions/useStationInformation';
import useStationStatus from './functions/useStationStatus';
import './App.css';

function App() {

  // State
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [filteredStations, setFilteredStations] = useState([]);
  const [allStations, setAllStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // Get feeds
  const { feeds } = useFeeds(baseURL);

  // Get station infomation
  var lookup1 = feeds ? feeds.find(feed => feed.name === 'station_information') : undefined;
  const stationInformationURL = lookup1 ? lookup1.url : 'URL not found';
  const { stationInformation } = useStationInformation(stationInformationURL);

  // Get station status
  var lookup2 = feeds ? feeds.find(feed => feed.name === 'station_status') : undefined;
  const stationStatusURL = lookup2 ? lookup2.url : 'URL not found';
  const { stationStatus } = useStationStatus(stationStatusURL);

  // Manage stations
  useEffect(() => {
    if (stationInformation && stationStatus) {
      // Create a map from station status for quick lookup
      const statusMap = new Map(stationStatus.map(status => [status.station_id, status]));

      // Merge information and status
      const mergedStations = stationInformation.map(info => {
        const status = statusMap.get(info.station_id) || {}; // Default to empty object if no status found
        return {
          ...info,
          ...status
        };
      });

      // Sort merged stations by name
      const sortedStations = mergedStations.sort((a, b) => a.name.localeCompare(b.name));

      // Update state
      setAllStations(sortedStations);
      setFilteredStations(sortedStations);
    }
  }, [stationInformation, stationStatus]);

  // Handle item selection
  const handleOnSelectItem = (station) => {
    setSelectedStation(station);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className='App'>
      <Navbar onToggleSidebar={toggleSidebar} />
      <div className="d-flex flex-grow-1">
        {isSidebarVisible && (
          <aside
            className={`bg-light p-3 ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
          >
            <div className="filter-sticky">
              <Filter 
                items={allStations}
                onFilteredItemsChange={(filtered) => {
                  setFilteredStations(filtered);
                }} 
              />
            </div>
            <ListGroup
              items={filteredStations}
              onSelectItem={handleOnSelectItem} 
            />
          </aside>
        )}
        <main className="flex-grow-1">
          <MapComponent
            stationData={filteredStations}
            sidebarVisible={isSidebarVisible}
            selectedStation={selectedStation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
