import { useState, useEffect } from 'react';
import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';
import Navbar from './components/Navbar';
import Map from './components/Map';
import getFeeds from './functions/getFeeds';
import './App.css';

function App() {

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // Get feeds
  const { feeds } = getFeeds(baseURL);
  let items = feeds.map(feed => feed.name);

  const handleOnSelectItem = (item) => {
    console.log(item)
  }
  
  const [alertVisible, setAlertVsibility] = useState(false);

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
}

export default App;