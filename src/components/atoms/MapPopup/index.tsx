import React from 'react';
import { Popup } from 'react-leaflet';

import { Msg } from 'src/i18n/Msg';
import { Place } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

export type Props = {
  description: string;
  name: string;
  place?: Place;
};

export const MapPopup: React.FC<Props> = ({ description, name, place }) => (
  <Popup>
    <h3>{name}</h3>

    <p className="popup-description">{description}</p>

    {place && (
      <p className="popup-link">
        <a href={createGoogleMapsURL(place)} rel="noreferrer" target="_blank">
          <Msg id="components.atoms.MapPopup.tooltip.showOnGoogleMaps" />
        </a>
      </p>
    )}
  </Popup>
);
