import { useState, useEffect, useRef, useCallback } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import useFetchData from './functions/useFetchData';
import './App.css';

function App() {
  const locations = {
    "location": [
      {
        "id": 1,
        "name": "Manchester",
        "url": "https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json",
        "lat": 53.470,
        "lon": -2.248,
        "zoom": 13
      },
      {
        "id": 2,
        "name": "West Midlands",
        "url": "https://gbfs.beryl.cc/v2_2/West_Midlands/gbfs.json",
        "lat": 52.482,
        "lon": -1.9,
        "zoom": 11
      },
    ],
  };

  const [selectedLocation, setSelectedLocation] = useState(locations.location[0]);
  const [baseURL, setBaseURL] = useState(selectedLocation.url);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filteredStations, setFilteredStations] = useState([]);
  const [filterText, setFilterText] = useState('');
  const mapRef = useRef(null);

  const { allStations, loading, error } = useFetchData(baseURL);

  // Handle location selection
  const handleSelectLocation = useCallback((location) => {
    setBaseURL(location.url);
    setSelectedLocation(location);
    handleReframe(location.lat, location.lon, location.zoom);
  }, []);

  // Handle reframe
  const handleReframe = (lat, lon, zoom) => {
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], zoom);
    }
  };

  // Initialise stations list
  useEffect(() => {
    if (allStations.length) {
      setFilteredStations(allStations);
    }
  }, [allStations]);

  // Handle station selection
  const handleOnSelectItem = (station) => {
    setSelectedStation(station);
  };

  // Handle refresh
  const handleRefresh = useCallback(() => {
    setBaseURL((prevBaseURL) => prevBaseURL);
  }, []);

  // Handle filtering stations
  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  useEffect(() => {
    if (filterText) {
      const filtered = allStations.filter(station =>
        station.name.toLowerCase().includes(filterText.toLowerCase())
      );
      setFilteredStations(filtered);
    } else {
      setFilteredStations(allStations);
    }
  }, [filterText, allStations]);

  // Handle toggling sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Centre view on user location
  const handleCentreView = () => {
    if (mapRef.current) {
      mapRef.current.centreMapOnUser();
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='App'>
      <Navbar
        onCentreView={handleCentreView}
        onToggleSidebar={toggleSidebar}
        onReframe={handleReframe}
        onRefresh={handleRefresh}
        locations={locations.location}
        onSelectLocation={handleSelectLocation}
        selectedLocation={selectedLocation}
      />
      <div className="d-flex flex-grow-1">
        {isSidebarVisible && (
          <aside className={`bg-light p-3 ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}>
            <div className="filter-sticky">
              <Filter 
                items={filteredStations}
                filterText={filterText}
                onFilterTextChange={handleFilterChange}
                onFilteredItemsChange={(filtered) => setFilteredStations(filtered)}
              />
            </div>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ListGroup
                items={filteredStations}
                onSelectItem={handleOnSelectItem}
              />
            )}
          </aside>
        )}
        <main className="flex-grow-1">
          <MapComponent
            stationData={filteredStations}
            sidebarVisible={isSidebarVisible}
            selectedStation={selectedStation}
            ref={mapRef}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
