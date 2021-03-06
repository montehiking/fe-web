import React from 'react';
import { Polyline } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/molecules/MapPopup';
import { LatLng } from 'src/types';

type Props = Omit<MapPopupProps, 'latLng' | 'zoom'> & {
  coordinates: LatLng[];
  notVerified?: boolean;
};

export const MapRoute: React.FC<Props> = ({
  coordinates,
  notVerified,
  ...commonProps
}) => (
  <Polyline
    pathOptions={{ color: notVerified ? '#FFCC00' : '#1890FF' }}
    positions={coordinates}
    weight={4}
  >
    <MapPopup {...commonProps} />
  </Polyline>
);
