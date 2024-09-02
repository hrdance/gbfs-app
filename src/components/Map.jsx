import React, { useRef, useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import pin from '../assets/pin.svg';

const Map = ({ stationData, sidebarVisible }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom] = useState(13);

  useEffect(() => {
    // Initialize the map
    if (!map.current) {
      map.current = new L.Map(mapContainer.current, {
        center: L.latLng(53.47, -2.248),
        zoom: zoom,
      });

      // Create MapTiler layer in Leaflet
      const mtLayer = new MaptilerLayer({
        apiKey: "7ceN16WDyUIUjj6kQnAT",
      }).addTo(map.current);
    }

    // Set icon
    const pinIcon = new L.Icon({
      iconUrl: pin,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    // Clear existing markers
    map.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        map.current.removeLayer(layer);
      }
    });

    // Add markers to the map
    stationData.forEach((station) => {
      L.marker([station.lat, station.lon], { icon: pinIcon })
        .addTo(map.current)
        .bindPopup(
          `<div style="text-align: center;">
            <b>${station.name}</b><br>
            Capacity: ${station.capacity}
          </div>`
        );
    });

  }, [stationData, zoom]);

  useEffect(() => {
    if (map.current) {
      map.current.invalidateSize();
    }
  }, [sidebarVisible]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

export default Map;
