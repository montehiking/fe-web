import { BaseIconOptions, Icon, Point } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { LatLng } from 'src/types';

const iconOptions: BaseIconOptions = {
  iconSize: new Point(27, 43),
  iconAnchor: [13.5, 41],
};

const mapIcons = {
  blue: new Icon({ iconUrl: '/pin/blue.svg', ...iconOptions }),
  red: new Icon({ iconUrl: '/pin/red.svg', ...iconOptions }),
  yellow: new Icon({ iconUrl: '/pin/yellow.svg', ...iconOptions }),
};

type Props = Omit<MapPopupProps, 'latLng'> & {
  icon: keyof typeof mapIcons;
  latLng: LatLng;
};

export const MapMarker: React.FC<Props> = ({
  description,
  icon,
  latLng,
  name,
  zoom,
}) => (
  <Marker icon={mapIcons[icon]} position={latLng} title={name}>
    <MapPopup
      description={description}
      latLng={latLng}
      name={name}
      zoom={zoom}
    />
  </Marker>
);
