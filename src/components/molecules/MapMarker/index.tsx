import { BaseIconOptions, Icon, Point } from 'leaflet';
import React, { Ref } from 'react';
import { Marker } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { LatLng, SetPlace, Zoom } from 'src/types';

const iconOptions: BaseIconOptions = {
  iconSize: new Point(27, 43),
  iconAnchor: [13.5, 41],
};

const mapIcons = {
  blue: new Icon({ iconUrl: '/pin/blue.svg', ...iconOptions }),
  gray: new Icon({ iconUrl: '/pin/gray.svg', ...iconOptions }),
  red: new Icon({ iconUrl: '/pin/red.svg', ...iconOptions }),
  yellow: new Icon({ iconUrl: '/pin/yellow.svg', ...iconOptions }),
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Marker = typeof Marker;

type Props = Omit<MapPopupProps, 'place'> & {
  activeRef?: Ref<Marker>;
  icon: keyof typeof mapIcons;
  latLng: LatLng;
  onClick?: SetPlace;
  zoom?: Zoom;
};

export const MapMarker: React.FC<Props> = ({
  activeRef,
  description,
  icon,
  latLng,
  name,
  onClick,
  zoom,
}) => (
  <Marker
    ref={activeRef as never}
    icon={mapIcons[icon]}
    position={latLng}
    title={name}
    eventHandlers={
      onClick && {
        click: (event) =>
          onClick('existing', {
            ...event.latlng,
            zoom: event.target._map._zoom,
          }),
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
