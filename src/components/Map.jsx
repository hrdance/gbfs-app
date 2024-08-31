import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";

import L from "leaflet";

import './map.css';

import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

const Map = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const center = { lng: 13.338414, lat: 52.507932 };
  const [zoom] = useState(12);

  useEffect(() => {
    if (map.current) return;

    map.current = new L.Map(mapContainer.current, {
      center: L.latLng(center.lat, center.lng),
      zoom: zoom
    });

    // Create a MapTiler Layer inside Leaflet
    const mtLayer = new MaptilerLayer({
      apiKey: "qsMPvMYjWJZi2vvi9t4L",
    }).addTo(map.current);

  }, [center.lng, center.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map"/>
    </div>
  )
}

export default Map;