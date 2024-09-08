import { useState, useEffect, useRef } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import useFetchData from './functions/useFetchData';
import './App.css';

function App() {

  // State
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [selectedStation, setSelectedStation] = useState(null);
  const [filteredStations, setFilteredStations] = useState([]);
  const [filterText, setFilterText] = useState('');
  const mapRef = useRef(null);

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // Get station data
  const { allStations, loading, error } = useFetchData(baseURL);

  useEffect(() => {
    if (allStations.length) {
      setFilteredStations(allStations);
    }
  }, [allStations]);

  // Handle item selection
  const handleOnSelectItem = (station) => {
    setSelectedStation(station);
  };

  // Handle filter change
  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Handle centre view
  const handleCentreView = () => {
    if (mapRef.current) {
      mapRef.current.centreMapOnUser();
    }
  };

  // Handle reframe
  const handleReframe = () => {
    if (mapRef.current) {
      mapRef.current.setView([53.47, -2.248], 13);
    }
  };

  // Display loading or error
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Draw app
  return (
    <div className='App'>
      <Navbar
        onCentreView={handleCentreView}
        onToggleSidebar={toggleSidebar}
        onReframe={handleReframe}
      />
      <div className="d-flex flex-grow-1">
        {isSidebarVisible && (
          <aside
            className={`bg-light p-3 ${isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden'}`}
          >
            <div className="filter-sticky">
              <Filter 
                items={allStations}
                filterText={filterText} 
                onFilterTextChange={handleFilterChange} 
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
            ref={mapRef}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
