import { BaseIconOptions, Icon, Point } from 'leaflet';
import React from 'react';
import { Marker } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { LatLng, Place, Zoom } from 'src/types';

const iconOptions: BaseIconOptions = {
  iconSize: new Point(27, 43),
  iconAnchor: [13.5, 41],
};

const mapIcons = {
  blue: new Icon({ iconUrl: '/pin/blue.svg', ...iconOptions }),
  red: new Icon({ iconUrl: '/pin/red.svg', ...iconOptions }),
  yellow: new Icon({ iconUrl: '/pin/yellow.svg', ...iconOptions }),
};

type Props = Omit<MapPopupProps, 'place'> & {
  icon: keyof typeof mapIcons;
  latLng: LatLng;
  onClick?: (place: Place) => void;
  zoom?: Zoom;
};

export const MapMarker: React.FC<Props> = ({
  description,
  icon,
  latLng,
  name,
  onClick,
  zoom,
}) => (
  <Marker
    icon={mapIcons[icon]}
    position={latLng}
    title={name}
    eventHandlers={
      onClick && {
        click: (event) =>
          onClick({ ...event.latlng, zoom: event.target._map._zoom }),
      }
    }
  >
    <MapPopup
      description={description}
      place={zoom ? { ...latLng, zoom } : undefined}
      name={name}
    />
  </Marker>
);
