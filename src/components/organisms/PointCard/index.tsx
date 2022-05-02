import React from 'react';

import { PlaceLink } from 'src/components/atoms/PlaceLink';
import { Point, Zoom } from 'src/types';

type Props = {
  point: Point;
  zoom: Zoom;
};

export const PointCard: React.FC<Props> = ({ point, zoom }) => {
  return (
    <PlaceLink
      place={{
        lat: point.geometry.coordinates[1],
        lng: point.geometry.coordinates[0],
        zoom,
      }}
    />
  );
};
