import { useState, useEffect } from 'react';
import Alert from './components/Alert';
import Button from './components/Button';
import ListGroup from './components/ListGroup';
import getJSON from './functions/getJSON';

function App() {

  // Base API URL
  const baseURL = 'https://gbfs.beryl.cc/v2_2/Greater_Manchester/gbfs.json';

  // State to hold feeds and URLs arrays
  const [feedNames, setFeedNames] = useState([]);
  const [feedURLs, setFeedURLs] = useState([]);

  // Fetch feed names and URLs
  useEffect(() => {
    getJSON(baseURL).then(data => {
      if (data) {
        setFeedNames(data.data.en.feeds.map(feed => feed.name));
        setFeedURLs(data.data.en.feeds.map(feed => feed.url));
      }
    });
  }, []);

  // Set feed URLs
  const freeBikeStatusURL = feedURLs[0];
  const geofencingZonesURL = feedURLs[1];
  const stationInformationURL = feedURLs[2];
  const stationStatusURL = feedURLs[3];
  const systemInformationURL = feedURLs[4];
  const systemPricingPlansURL = feedURLs[5];
  const systemRegionsURL = feedURLs[6];
  const vehicleTypesURL = feedURLs[7];
  const GBFSVersionsURL = feedURLs[8];

  // State to hold station names
  const [stationIDs, setStationIDs] = useState([]);
  const [stationNames, setStationNames] = useState([]);
  const [stationLat, setStationLat] = useState([]);
  const [stationLon, setStationLon] = useState([]);

  // Fetch station names
  useEffect(() => {
    getJSON(stationInformationURL).then(data => {
      if (data) {
        setStationIDs(data.data.stations.map(station => station.station_id));
        setStationNames(data.data.stations.map(station => station.name));
        setStationLat(data.data.stations.map(station => station.lat));
        setStationLon(data.data.stations.map(station => station.lon));
      }
    });
  }, []);

  let items = feedNames;

  console.log(stationLon);

  const handleOnSelectItem = (item) => {
    console.log(item)
  }
  
  const [alertVisible, setAlertVsibility] = useState(false);

  return (
    <div>
      {alertVisible && <Alert text='Message' onClose={() => setAlertVsibility(false)}></Alert>}
      <Button
        text='Button'
        //color='success'
        onClick={() => setAlertVsibility(true)}
      />
      <ListGroup
        heading='Places'
        items={items}
        onSelectItem={handleOnSelectItem}
      />
    </div>
  );
}

export default App;