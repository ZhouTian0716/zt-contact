import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

interface IProps {
  center: {
    lat: number;
    lng: number;
  };
  customStyles?: React.CSSProperties;
}

function ContactLocation({ center, customStyles }: IProps) {
  return (
    <GoogleMap mapContainerStyle={customStyles} center={center} zoom={3}>
      <>
        <Marker position={center} />
      </>
    </GoogleMap>
  );
}

export default React.memo(ContactLocation);
