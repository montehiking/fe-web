import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MapLocationMarker } from 'src/components/atoms/MapLocationMarker';
import { MapMarker } from 'src/components/atoms/MapMarker';
import { LatLng, Point } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

type Props = {
  onClick: (latLng: LatLng) => void;
  points: Point[];
};

export const MarkersLayer: React.FC<Props> = ({ onClick, points }) => {
  const [zoom, setZoom] = useState(getInitialZoom());

  useMapEvents({
    zoom: (event) => setZoom(event.target._zoom),
    click: (event) => onClick(event.latlng),
  });

  return (
    <>
      {points.map(({ properties, geometry }) => {
        const [lng, lat] = geometry.coordinates;

        return (
          <MapMarker
            description={properties.description}
            icon={properties.notVerified ? 'yellow' : 'red'}
            key={`${lat}${lng}`}
            latLng={{ lng, lat }}
            title={properties.title}
            zoom={zoom}
          />
        );
      })}

      <MapLocationMarker />
    </>
  );
};
