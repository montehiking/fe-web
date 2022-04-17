import React from 'react';
import { Popup } from 'react-leaflet';

import { Msg } from 'src/i18n/Msg';
import { LatLng, Zoom } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

export type Props = {
  description: string;
  latLng?: LatLng;
  name: string;
  zoom?: Zoom;
};

export const MapPopup: React.FC<Props> = ({
  description,
  latLng,
  name,
  zoom,
}) => (
  <Popup>
    <h3>{name}</h3>

    <p className="popup-description">{description}</p>

    {zoom && latLng && (
      <p className="popup-link">
        <a
          href={createGoogleMapsURL(latLng.lat, latLng.lng, zoom)}
          rel="noreferrer"
          target="_blank"
        >
          <Msg id="components.atoms.MapPopup.tooltip.showOnGoogleMaps" />
        </a>
      </p>
    )}
  </Popup>
);
