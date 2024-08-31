import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import './map.css';

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: -2.2463, lat: 53.4767 };
  const [zoom] = useState(13);

  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: "7ceN16WDyUIUjj6kQnAT",
    }).addTo(map.current);

  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map"/>
    </div>
  )
}

export default Map;