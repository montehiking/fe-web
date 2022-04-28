import { Marker as LeafletMarker } from 'leaflet';
import { forwardRef } from 'react';
import { Marker } from 'react-leaflet';

import {
  MapPopup,
  Props as MapPopupProps,
} from 'src/components/atoms/MapPopup';
import { LatLng, SetPlace, Zoom } from 'src/types';
import { Icons, icons } from 'src/utils/maps';

export type TMarker = LeafletMarker;

type Props = Omit<MapPopupProps, 'place'> & {
  icon: Icons;
  latLng: LatLng;
  onClick: SetPlace;
  zoom?: Zoom;
};

export const MapMarker = forwardRef<TMarker, Props>(
  ({ description, icon, latLng, name, onClick, zoom }, ref) => (
    <Marker
      ref={ref}
      icon={icons[icon]}
      position={latLng}
      title={name}
      eventHandlers={{
        click: ({ latlng, target }) =>
          onClick('existing', { ...latlng, zoom: target._map._zoom }),
      }}
    >
      <MapPopup
        description={description}
        place={zoom ? { ...latLng, zoom } : undefined}
        name={name}
      />
    </Marker>
  )
);
