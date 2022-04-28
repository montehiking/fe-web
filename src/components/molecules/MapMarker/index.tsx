import React, { Ref } from 'react';
import { Marker } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { LatLng, SetPlace, Zoom } from 'src/types';
import { Icons, icons } from 'src/utils/maps';

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Marker = typeof Marker;

type Props = Omit<MapPopupProps, 'place'> & {
  activeRef?: Ref<Marker>;
  icon: Icons;
  latLng: LatLng;
  onClick: SetPlace;
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
    icon={icons[icon]}
    position={latLng}
    title={name}
    eventHandlers={{
      click: (event) =>
        onClick('existing', {
          ...event.latlng,
          zoom: event.target._map._zoom,
        }),
    }}
  >
    <MapPopup
      description={description}
      place={zoom ? { ...latLng, zoom } : undefined}
      name={name}
    />
  </Marker>
);
