import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

export default function MyMap() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        setError("Unable to retrieve location: " + err.message);
      }
    );
  }, []);

  // Before we know the position, show loading or error
  if (error) {
    return <p>{error}</p>;
  }
  if (!position) {
    return <p>📍 Requesting your location...</p>;
  }

  // Once we have position, render the map
  return (
    <APIProvider apiKey={apiKey}>
      <div className="fullscreen">
        <Map
          defaultCenter={position}
          defaultZoom={18}
          disableDefaultUI 
          mapId="ca7c3a2dc251241bacdc61c3"
        >
          <AdvancedMarker position={position}>
            <span>📍</span>
          </AdvancedMarker>
        </Map>
      </div>
    </APIProvider>
  );
}
