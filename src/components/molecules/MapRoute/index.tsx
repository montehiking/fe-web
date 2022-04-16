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
  notVerified?: boolean;
};

export const MapRoute: React.FC<Props> = ({
  coordinates,
  description,
  notVerified,
  title,
}) => {
  const icon = notVerified ? 'yellow' : 'blue';
  const commonProps = { description, title };

  return (
    <>
      <Polyline pathOptions={{ color: '#1890ff' }} positions={coordinates}>
        <MapPopup {...commonProps} />
      </Polyline>

      <MapMarker icon={icon} latLng={coordinates[0]} {...commonProps} />
      <MapMarker
        icon={icon}
        latLng={coordinates[coordinates.length - 1]}
        {...commonProps}
      />
    </>
  );
};
