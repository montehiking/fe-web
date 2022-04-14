import { Icon, Point } from 'leaflet';
import React, { useState } from 'react';
import { Marker, useMapEvent } from 'react-leaflet';

import { LatLng } from 'src/types';

const icon = new Icon({
  iconUrl: '/dot/blue.svg',
  iconSize: new Point(20, 20),
});

export const MapGeolocationMarker: React.FC = () => {
  const [position, setPosition] = useState<LatLng | null>(null);

  useMapEvent('locationfound', (e) => setPosition(e.latlng));

  if (!position) {
    return null;
  }

  return <Marker icon={icon} position={position} zIndexOffset={999} />;
};
