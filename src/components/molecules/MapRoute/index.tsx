import React from 'react';
import { Polyline } from 'react-leaflet';

import { MapMarker } from 'src/components/atoms/MapMarker';
import { LatLng } from 'src/types';

type Props = {
  coordinates: LatLng[];
  description: string;
  title: string;
};

export const MapRoute: React.FC<Props> = ({ coordinates, ...options }) => (
  <>
    <Polyline pathOptions={{ color: '#1890ff' }} positions={coordinates} />

    <MapMarker icon="blue" latLng={coordinates[0]} {...options} />
    <MapMarker
      icon="blue"
      latLng={coordinates[coordinates.length - 1]}
      {...options}
    />
  </>
);
