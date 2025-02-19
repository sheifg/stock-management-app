import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import geocodeAddress from "../helper/geocodeAddress";
import { useState } from "react";
import { Card, CardHeader, CardMedia } from "@mui/material";

const position = [52.520008, 13.40495];
const MapComponent = () => {
  const firms = useSelector((state) => state.firms.data);
  const [positions, setPositions] = useState({});
  // positions = {firmId: [lat, lng]}
  // positions = {2121212121: [12, 25], 123123123123: [12, 25], 123123123: [12, 24]},

  // When this page is first loaded, it is necessary to convert all the firms addresses to coordinates and collect them in a state
  useEffect(() => {
    const getPositions = async () => {
      const newPosition = {};
      // Loop over all the firms and call geocodeAddress function for each address
      // and these coordinates will be stored in the newPosition object, with the firmId as the key
      for (const firm of firms) {
        const coords = await geocodeAddress(firm.address);
        if (coords) newPosition[firm._id] = coords;
      }
        // Once it is had all the positions, it can be set them in the state
      setPositions(newPosition);
    }
    // Now this function can be called, when all the coors were collected
    getPositions();
  }, [firms]);
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "70vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
       {/* Here it is looped all the firms and check wether they have coordinates and if that firm has coordinate, it is rendered a Marker for that company*/}
      {firms.map(
        (item, index) =>
          positions[item._id] && (
            <Marker key={index} position={positions[item._id]}>
              <Popup>
                <Card>
                    <CardHeader title={item.name} />
                    <CardMedia 
                    component="img" 
                    src={item.image} 
                    height={100}
                    alt={item.name}
                    sx={{ objectFit: 'cover' }}
                    />
                </Card>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default MapComponent;
