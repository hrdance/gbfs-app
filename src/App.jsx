import { useState, useEffect, useRef, useCallback } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import useFetchData from './functions/useFetchData';
import locationData from './assets/locations.json';
import './App.css';

function App() {
  const locations = locationData;

  // State
  const [selectedLocation, setSelectedLocation] = useState(locations.location[3]);
  const [baseURL, setBaseURL] = useState(selectedLocation.url);
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filteredStations, setFilteredStations] = useState([]);
  const mapRef = useRef(null);
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const { allStations, loading, error } = useFetchData(baseURL + (shouldRefresh ? '?refresh' : ''));

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
    setShouldRefresh((prev) => !prev);
  }, []);

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
        <aside className={`bg-light ${isSidebarVisible ? 'p-3 sidebar-visible' : 'py-3 sidebar-hidden'}`}>
          <div className="filter-sticky">
            <Filter 
              items={allStations}
              onFilteredItemsChange={setFilteredStations}
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
        <main className="flex-grow-1">
          <MapComponent
            stationData={filteredStations}
            sidebarVisible={isSidebarVisible}
            selectedStation={selectedStation}
            ref={mapRef}
            selectedLocation={selectedLocation}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
