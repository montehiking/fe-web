import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MapGeolocationMarker } from 'src/components/atoms/MapGeolocationMarker';
import { MapMarker } from 'src/components/molecules/MapMarker';
import { LatLng, Point } from 'src/types';
import { getInitialZoom } from 'src/utils/maps';

type Props = {
  onClick: (latLng: LatLng) => void;
  points: Point[];
};

export const MapMarkersLayer: React.FC<Props> = ({ onClick, points }) => {
  const [zoom, setZoom] = useState(getInitialZoom());

  useMapEvents({
    zoomend: (event) => setZoom(event.target._zoom),
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
            name={properties.name}
            zoom={zoom}
          />
        );
      })}

      <MapGeolocationMarker />
    </>
  );
};
