import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

import './Map.css';

const Map = (props) => {
  const mapRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      zoom: 10,
    });
    map.setCenter([props.lng, props.lat]);
    new mapboxgl.Marker().setLngLat([props.lng, props.lat]).addTo(map);
  }, [props.lng, props.lat]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
