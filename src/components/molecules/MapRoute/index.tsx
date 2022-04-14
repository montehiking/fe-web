import React from 'react';
import { Polyline } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { MapMarker } from 'src/components/molecules/MapMarker';
import { LatLng } from 'src/types';

type Props = Omit<MapPopupProps, 'latLng' | 'zoom'> & {
  coordinates: LatLng[];
};

export const MapRoute: React.FC<Props> = ({
  coordinates,
  description,
  title,
}) => (
  <>
    <Polyline pathOptions={{ color: '#1890ff' }} positions={coordinates}>
      <MapPopup description={description} title={title} />
    </Polyline>

    <MapMarker
      icon="blue"
      latLng={coordinates[0]}
      title={title}
      description={description}
    />
    <MapMarker
      icon="blue"
      latLng={coordinates[coordinates.length - 1]}
      title={title}
      description={description}
    />
  </>
);
