import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import catimg from "./assets/1.jpg";
import dogimg from "./assets/2.jpg";
import img3 from "./assets/3.jpeg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
const profiles = [
  {
    id: 1,
    name: "Emma",
    position: { lat: 47.6529595, lng: -122.3128423 },
    image: catimg,
  },
  {
    id: 2,
    name: "linda",
    position:{ lat: 47.6529596, lng: -122.3083408 },
    image: dogimg,
  },
  {
    id: 3,
    name: "cat",
    position: { lat: 47.6549716, lng: -122.3079505 },
    image: img3,
  },
  {
    id: 4,
    name: "cat",
    position: { lat: 47.6530542, lng: -122.3050729 },
    image: img4,
  },
  {
    id: 5,
    name: "cow",
    position: { lat: 47.6572631, lng: -122.3071972 },
    image: img5,
  },
 
 
];







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
          defaultCenter={ {lat: 47.6538254, lng: -122.3078057 }} /* remember to change back to position   */
          defaultZoom={18}
          disableDefaultUI 
          mapId="ca7c3a2dc251241bacdc61c3"
        >
          {profiles.map((user)=>(
            <AdvancedMarker key={user.id} position={user.position}>
              <img
                src={user.image}
                alt={user.name}
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "12px",
                  border: "3px solid #1E90FF",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  objectFit: "cover",
                }}
              />
              
            </AdvancedMarker>

          )

          )}
          
        </Map>
      </div>
    </APIProvider>
  );
}
