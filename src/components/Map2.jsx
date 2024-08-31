import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import './map.css';
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map2 = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: -2.2463, lat: 53.4767 };
  const [zoom] = useState(13);

  // Sample JSON data for station locations
  const stationData = [
    { name: 'Station 1', lat: 53.479, lng: -2.245 },
    { name: 'Station 2', lat: 53.480, lng: -2.247 },
    { name: 'Station 3', lat: 53.481, lng: -2.246 }
    // Add more stations as needed
  ];

  useEffect(() => {
    if (map.current) return;

    // Initialize the map
    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: "7ceN16WDyUIUjj6kQnAT",
    }).addTo(map.current);

    // Add markers to the map
    stationData.forEach((station) => {
      L.marker([station.lat, station.lng])
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

export default Map2;
