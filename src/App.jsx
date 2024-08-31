import { useState, useEffect } from 'react';
import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import Map from './components/Map';
import Filter from './components/Filter';
import useFeeds from './functions/useFeeds';
import useStations from './functions/useStations';
import './App.css';

function App() {

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // Get feeds
  const { feeds } = useFeeds(baseURL);
  var lookup = feeds ? feeds.find(feed => feed.name === 'station_information') : undefined;
  const stationInformationURL = lookup ? lookup.url : 'URL not found';

  // Get stations
  const { stations } = useStations(stationInformationURL);
  const items = stations ? stations.map(station => station.name) : [];
  //console.log(stations);

  const handleOnSelectItem = (item) => {
    console.log(item)
  }
  
  const [alertVisible, setAlertVsibility] = useState(false);

  return (
    <div className='App d-flex flex-column vh-100'>
      {alertVisible && <Alert text='Message' onClose={() => setAlertVsibility(false)} />}
      <Navbar />
      <div className="d-flex flex-grow-1">
        <aside className="sidebar bg-light p-3" style={{ width: '300px', overflowY: 'auto' }}>
          <Button
            text='Button'
            onClick={() => setAlertVsibility(true)}
          />
          <ListGroup
            heading='Places'
            items={items}
            onSelectItem={handleOnSelectItem}
          />
        </aside>
        <main className="flex-grow-1">
          <Map />
        </main>
      </div>  
    </div>
  );
}

export default App;