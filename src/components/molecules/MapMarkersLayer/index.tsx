import React, { useEffect, useRef, useState } from 'react';
import { useMapEvents } from 'react-leaflet';

import { MapGeolocationMarker } from 'src/components/atoms/MapGeolocationMarker';
import { MapMarker, TMarker } from 'src/components/molecules/MapMarker';
import { POINT_ROUTE } from 'src/constants';
import { Point, SetPlace, SetZoom, Zoom } from 'src/types';
import { getIconColor } from 'src/utils/maps';

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

  const marker = useRef<TMarker>(null);

  useEffect(() => {
    if (marker.current) {
      marker.current.openPopup();
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

        return (
          <MapMarker
            ref={properties.active ? marker : null}
            description={properties.description}
            icon={getIconColor(properties.category, properties.notVerified)}
            key={`${lat}${lng}${properties.name}`}
            latLng={{ lng, lat }}
            name={properties.name}
            onClick={onClick}
            zoom={properties.category === POINT_ROUTE ? undefined : zoom}
          />
        );
      })}

      <MapGeolocationMarker />
    </>
  );
};
