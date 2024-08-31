import { useState, useEffect } from 'react';
import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import Map from './components/Map';
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

  console.log(stationInformationURL);

  // Get stations
  const { stations } = useStations(stationInformationURL);
  console.log(stations);
  const items = stations ? stations.map(station => station.name) : [];

  const handleOnSelectItem = (item) => {
    console.log(item)
  }
  
  const [alertVisible, setAlertVsibility] = useState(false);
/*
  return (
    <div className='App'>
      {alertVisible && <Alert text='Message' onClose={() => setAlertVsibility(false)}></Alert>}
      <Navbar />
      <div className="d-flex flex-grow-1">
        <aside className="bg-light p-3" style={{ width: '250px' }}>
          <Button
            text='Button'
            onClick={() => setAlertVisibility(true)}
          />
          <ListGroup
            heading='Places'
            items={items}
            onSelectItem={handleOnSelectItem}
          />
        </aside>
        <main className="flex-grow-1 p-3">
          <Map />
        </main>
      </div>  
    </div>
  );
*/
return (
  <div className='App d-flex flex-column vh-100'>
    {alertVisible && <Alert text='Message' onClose={() => setAlertVsibility(false)} />}
    <Navbar />
    <div className="d-flex flex-grow-1">
      {/* Sidebar */}
      <aside className="sidebar bg-light p-3" style={{ width: '250px', overflowY: 'auto' }}>
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
      {/* Main Content Area */}
      <main className="flex-grow-1">
        <Map />
      </main>
    </div>  
  </div>
);
}

export default App;