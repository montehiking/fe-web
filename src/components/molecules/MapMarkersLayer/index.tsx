import React, { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MapGeolocationMarker } from 'src/components/atoms/MapGeolocationMarker';
import { MapMarker, Marker } from 'src/components/molecules/MapMarker';
import { POINT_TEMP } from 'src/constants';
import { Point, SetPlace, SetZoom, Zoom } from 'src/types';

type Props = {
  initialZoom: Zoom;
  onClick: SetPlace;
  onZoom: SetZoom;
  points: Point[];
};

export const MapMarkersLayer: React.FC<Props> = ({
  initialZoom,
  onClick,
  onZoom,
  points,
}) => {
  const [zoom, setZoom] = useState(initialZoom);

  const marker = useRef<Marker>();

  useEffect(() => {
    if (marker.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (marker.current as any).openPopup();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!marker.current]);

  useMapEvents({
    zoomend: (event) => {
      onZoom(event.target._zoom);
      setZoom(event.target._zoom);
    },
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
            activeRef={properties.active ? (marker as never) : undefined}
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
