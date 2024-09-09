import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";
import pin from '../assets/pin.svg';
import location from '../assets/location.svg';
import unavailable from '../assets/unavailable.svg';
import ReactDOMServer from "react-dom/server";
import StationPopup from './StationPopup';
import LocationPopup from './LocationPopup';
import '../App.css'

const MapComponent = forwardRef(({ stationData, sidebarVisible, selectedStation, selectedLocation }, ref) => {

  const mapContainer = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef(new Map());
  const locationMarkerRef = useRef(null);

  // Station icon
  const pinIcon = new L.Icon({
    iconUrl: pin,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -48]
  });

  // Unavailable station icon
  const unavailableIcon = new L.Icon({
    iconUrl: unavailable,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -48]
  });

  // Location icon
  const locationIcon = new L.Icon({
    iconUrl: location,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -28]
  });

  useEffect(() => {
    if (!mapInstance.current) {
      mapInstance.current = new L.Map(mapContainer.current, {
        center: L.latLng(selectedLocation.lat, selectedLocation.lon),
        zoom: selectedLocation.zoom,
      });

      new MaptilerLayer({
        apiKey: "7ceN16WDyUIUjj6kQnAT",
      }).addTo(mapInstance.current);
    }

    if (mapInstance.current) {

      // Remove all existing markers
      markersRef.current.forEach(marker => {
        mapInstance.current.removeLayer(marker);
      });
      markersRef.current.clear();

      // Add new markers
      stationData.forEach((station) => {
        const existingMarker = markersRef.current.get(station.station_id);

        if (existingMarker) {
          existingMarker.setLatLng([station.lat, station.lon]);
          existingMarker.setIcon(
            station.beryl_bike > 0 || station.bbe > 0 ? pinIcon : unavailableIcon
          );
        } else {
          const marker = L.marker([station.lat, station.lon], {
            icon: station.beryl_bike > 0 || station.bbe > 0 ? pinIcon : unavailableIcon,
          }).addTo(mapInstance.current);

          marker.bindPopup(ReactDOMServer.renderToString(<StationPopup station={station}/>), {closeButton: false});
          markersRef.current.set(station.station_id, marker);
        }
      });
    }

  }, [stationData, sidebarVisible]);

  useEffect(() => {
    if (mapInstance.current && selectedStation) {
      mapInstance.current.closePopup();
      const selectedMarker = markersRef.current.get(selectedStation.station_id);
      if (selectedMarker) {
        selectedMarker.openPopup();
        mapInstance.current.setView([selectedStation.lat, selectedStation.lon], mapInstance.current.getZoom());
      }
    }
  }, [selectedStation, sidebarVisible]);

  useImperativeHandle(ref, () => ({
    centreMapOnUser() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          if (locationMarkerRef.current) {
            mapInstance.current.removeLayer(locationMarkerRef.current);
          }

          locationMarkerRef.current = L.marker([latitude, longitude], {
            icon: locationIcon,
            title: 'You are here'
          }).addTo(mapInstance.current).bindPopup(ReactDOMServer.renderToString(<LocationPopup/>), {closeButton: false});

          mapInstance.current.setView([latitude, longitude], 15);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    },
    setView(coords, zoom) {
      if (mapInstance.current) {
        mapInstance.current.setView(coords, zoom);
      }
    },
  }));

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
})

export default MapComponent;
