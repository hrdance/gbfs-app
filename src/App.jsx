import { useState, useEffect } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import useFeeds from './functions/useFeeds';
import useStationInformation from './functions/useStationInformation';
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
  var lookup = feeds ? feeds.find(feed => feed.name === 'station_information') : undefined;
  const stationInformationURL = lookup ? lookup.url : 'URL not found';

  // Get stations
  const { stations } = useStationInformation(stationInformationURL);

  // Manage stations
  useEffect(() => {
    if (stations) {
      const sortedStations = [...stations].sort((a, b) => a.name.localeCompare(b.name));
      setAllStations(sortedStations);
      setFilteredStations(sortedStations);
    }
  }, [stations]);

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
