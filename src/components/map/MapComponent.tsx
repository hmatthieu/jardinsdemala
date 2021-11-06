import * as React from "react";
import { forwardRef } from "react";
import styled from "styled-components";
import {
  Map as LeafletMap,
  Marker,
  Popup as PopupLeaflet,
  TileLayer,
} from "react-leaflet";
import "./style.css";

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
  user-select: none;
`;

const Popup = styled(PopupLeaflet)`
  text-align: center;

  .leaflet-popup-content-wrapper {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    transform: translateX(-20%);
  }

  .leaflet-popup-content {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 14px 35px;
  }

  .leaflet-popup-close-button {
    display: none;
  }
`;

const Link = styled.a`
  font-weight: 500;
  font-size: 18px;
  color: black !important;
  text-decoration: underline;
  white-space: nowrap;
`;

export interface MarkerData {
  text: string;
  href: string;
  position: [number, number];
}

export interface Props {
  markers: MarkerData[];
}

export const MapComponent = forwardRef<LeafletMap, Props>(
  ({ markers }, ref) => (
    <MapContainer>
      <LeafletMap
        ref={ref}
        center={[47.284776, 2.5832382]}
        zoom={8}
        minZoom={4}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png"
          subdomains="abcd"
        />
        {markers.map((marker, index) => (
          <Marker key={`${marker.text}_${index}`} position={marker.position}>
            <Popup>
              <Link href={marker.href} rel="noopener" target="_blank">
                {marker.text}
              </Link>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </MapContainer>
  )
);
