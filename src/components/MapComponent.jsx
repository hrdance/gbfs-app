import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import pin from '../assets/pin.svg';
import bike from '../assets/bike.svg';
import electric from '../assets/electric.svg';
import location from '../assets/location.svg';
import unavailable from '../assets/unavailable.svg';

const MapComponent = forwardRef(({ stationData, sidebarVisible, selectedStation }, ref) => {
  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef(new Map());
  const [zoom, setZoom] = useState(13);

  // Station icon
  const pinIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Unavailable station icon
  const unavailableIcon = new L.Icon({
    iconUrl: unavailable,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  // Location icon
  const locationIcon = new L.Icon({
    iconUrl: location,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });

  useEffect(() => {
    // Initialize the map only once
    if (!mapInstance.current) {
      mapInstance.current = new L.Map(mapContainer.current, {
        center: L.latLng(53.47, -2.248),
        zoom: zoom,
      });
  
      // Create MapTiler layer in Leaflet
      new MaptilerLayer({
        apiKey: "7ceN16WDyUIUjj6kQnAT",
      }).addTo(mapInstance.current);
    }
  
    // Update or add markers to map
    stationData.forEach((station) => {
      const existingMarker = markersRef.current.get(station.station_id);
  
      if (existingMarker) {
        // Update existing marker's position and icon if necessary
        existingMarker.setLatLng([station.lat, station.lon]);
        existingMarker.setIcon(
          station.beryl_bike > 0 || station.bbe > 0 ? pinIcon : unavailableIcon
        );
      } else {
        // Create a new marker if it doesn't exist
        const marker = L.marker([station.lat, station.lon], {
          icon: station.beryl_bike > 0 || station.bbe > 0 ? pinIcon : unavailableIcon,
        }).addTo(mapInstance.current);
  
        // Bind popup to marker
        marker.bindPopup(
          `<div style="text-align: center;">
            <b>${station.name}</b><br>
            Capacity: <b>${station.capacity}</b><br>
            Docks available: <b>${station.num_docks_available}</b><br>
            Bikes available: <br>
            <div style="display: flex; align-items: center; justify-content: center;">
              <b>${station.beryl_bike}</b>  <img src="${bike}" alt="Beryl bike" /> 
              <img src="${electric}" alt="Electric bike" />  <b>${station.bbe}</b>
            </div>
          </div>`
        );
  
        // Store the marker
        markersRef.current.set(station.station_id, marker);
      }
    });
  
  }, [stationData]);
  

  // Handle station selectiion
  useEffect(() => {
    if (mapInstance.current && selectedStation) {
      // Close existing popup
      mapInstance.current.closePopup();
      const selectedMarker = markersRef.current.get(selectedStation.station_id);
      if (selectedMarker) {
        // Open popup
        selectedMarker.openPopup();
        // Center map
        mapInstance.current.setView([selectedStation.lat, selectedStation.lon], mapInstance.current.getZoom());
      }
    }
  }, [selectedStation]);

  // Redraw when sidebar toggled
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.invalidateSize();
    }
  }, [sidebarVisible]);

  // Expose centerMap method to App
  useImperativeHandle(ref, () => ({
    centreMapOnUser() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          L.marker([latitude, longitude], {
            icon: locationIcon,
            title: 'You are here'
          }).addTo(mapInstance.current).bindPopup('You are here');

          setZoom(14);
          mapInstance.current.setView([latitude, longitude], 14);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }));

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
})

export default MapComponent;
