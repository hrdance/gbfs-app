import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L, { icon } from "leaflet";
import './map.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import pin from '../assets/pin.svg';

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: -2.2463, lat: 53.4767 };
  const [zoom] = useState(13);

  // Sample JSON data for station locations
  const stationData = [
    { name: 'Station 1', lat: 53.479, lon: -2.245 },
    { name: 'Station 2', lat: 53.480, lon: -2.247 },
    { name: 'Station 3', lat: 53.481, lon: -2.246 }
    // Add more stations as needed
  ];

  useEffect(() => {
    if (map.current) return;

    // Initialize the map
    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom,
      //attributionControl: false
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: "7ceN16WDyUIUjj6kQnAT",
    }).addTo(map.current);

    // Define a custom icon using the imported SVG file
    const pinIcon = new L.Icon({
      iconUrl: pin,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Add markers to the map
    stationData.forEach((station) => {
      L.marker([station.lat, station.lon], { icon: pinIcon })
        .addTo(map.current)
        .bindPopup(`<b>${station.name}</b>`);
    });
  }, [center.lng, center.lat, zoom, stationData]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;
