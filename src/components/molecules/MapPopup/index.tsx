import React from 'react';
import { Popup } from 'react-leaflet';

import { PlaceLink } from 'src/components/atoms/PlaceLink';
import { Place } from 'src/types';

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
        <PlaceLink place={place} />
      </p>
    )}
  </Popup>
);
