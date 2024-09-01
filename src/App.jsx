import { useState, useEffect, useCallback } from 'react';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Filter from './components/Filter';
import useFeeds from './functions/useFeeds';
import useStations from './functions/useStations';
import './App.css';

function App() {

  // State for sidebar and filtered items
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // Get feeds
  const { feeds } = useFeeds(baseURL);
  var lookup = feeds ? feeds.find(feed => feed.name === 'station_information') : undefined;
  const stationInformationURL = lookup ? lookup.url : 'URL not found';

  // Get stations
  const { stations } = useStations(stationInformationURL);
  
  useEffect(() => {
    if (stations) {
      const stationNames = stations.map(station => station.name);
      setItems(stationNames);
      setFilteredItems(stationNames);
    }
  }, [stations]);

  // Handle filtering
  const handleFilteredItemsChange = useCallback((items) => {
    setFilteredItems(items);
  }, []);

  // Handle item selection
  const handleOnSelectItem = (item) => {
    console.log(item)
  }

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
            <Filter items={items} onFilteredItemsChange={handleFilteredItemsChange} />
            <ListGroup heading='Stations' items={filteredItems} onSelectItem={handleOnSelectItem} />
          </aside>
        )}
        <main className="flex-grow-1">
          <Map />
        </main>
      </div>
    </div>
  );
}

export default App;