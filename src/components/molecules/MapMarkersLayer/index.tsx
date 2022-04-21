import React, { useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MapGeolocationMarker } from 'src/components/atoms/MapGeolocationMarker';
import { MapMarker } from 'src/components/molecules/MapMarker';
import { POINT_TEMP } from 'src/constants';
import { Point, SetPlace, Zoom } from 'src/types';

type Props = {
  onClick: SetPlace;
  points: Point[];
  initialZoom: Zoom;
};

export const MapMarkersLayer: React.FC<Props> = ({
  onClick,
  points,
  initialZoom,
}) => {
  const [zoom, setZoom] = useState(initialZoom);

  useMapEvents({
    zoomend: (event) => setZoom(event.target._zoom),
    click: (event) =>
      onClick('new', { ...event.latlng, zoom: event.target._zoom }),
  });

  return (
    <>
      {points.map(({ properties, geometry }) => {
        const [lng, lat] = geometry.coordinates;

        const icon =
          properties.category === POINT_TEMP
            ? 'gray'
            : properties.notVerified
            ? 'yellow'
            : 'red';

        return (
          <MapMarker
            description={properties.description}
            icon={icon}
            key={`${lat}${lng}`}
            latLng={{ lng, lat }}
            name={properties.name}
            onClick={onClick}
            zoom={zoom}
          />
        );
      })}

      <MapGeolocationMarker />
    </>
  );
};
