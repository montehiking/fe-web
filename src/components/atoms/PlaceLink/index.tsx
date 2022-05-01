import React from 'react';

import { Msg } from 'src/i18n/Msg';
import { Place } from 'src/types';
import { createGoogleMapsURL } from 'src/utils/maps';

export type Props = {
  place: Place;
};

export const PlaceLink: React.FC<Props> = ({ place }) => (
  <a href={createGoogleMapsURL(place)} rel="noreferrer" target="_blank">
    <Msg id="components.atoms.PlaceLink.tooltip.showOnGoogleMaps" />
  </a>
);
